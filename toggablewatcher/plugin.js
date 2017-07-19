var EventEmitter = require('events');

/**
 * Witholds file updates from webpack, and allows them to be forwarded on command.
 */
class ToggableWatchPlugin {
  /**
   * Create a plugin instance.
   * @param  {Object} options
   * @param {boolean} options.forwardByDefault If true, will forward updates to webpack when no setting is defined for the change. True by default.
   * @param {Object} options.forwardFilters An object with paths as keys, and the associated forward settings as values.
   *
   */
	constructor(options) {
    this.options = options || {};
		this.fileSystem = null;
	}

	apply(compiler) {
		compiler.plugin("after-environment", () => {
			this.fileSystem = new ToggableWatchFileSystem(compiler.watchFileSystem, this.options);
			compiler.watchFileSystem = this.fileSystem;
		});
	}
}

module.exports = ToggableWatchPlugin;

class ToggableWatchFileSystem extends EventEmitter {
	constructor(wfs, options) {
    super();
		this.wfs = wfs;
    this.forwardByDefault = options.forwardByDefault || false;
    this.forwardPaths = options.forwardPaths || [];
    this.withholdPaths = options.withholdPaths || [];
    this.callback = null;
    this.callbackUndelayed = null;

		// Public
    this.withheldFiles = {};
		this.withheldDirs = {};

    this.forwardCache = {};
    global.debugme = this;
	}

	watch(files, dirs, missing, startTime, options, callback, callbackUndelayed) {
    this.callback = callback;
    this.callbackUndelayed = callbackUndelayed;
    this.fileTimestamps = {};
    files.forEach(path => this.fileTimestamps[path] = 1);
    this.dirTimestamps = {};
    files.forEach(path => this.dirTimestamps[path] = 1);

		this.wfs.watch(files, dirs, missing, startTime, options, (err, filesModified, dirsModified, missingModified, fileTimestamps, dirTimestamps) => {
			if(err) return callback(err);
      console.log('aggregate change detected!!!');
      const forwardedFiles = files

      filesModified.filter(path => !this.shouldForwardChange(path)).forEach(path => {
				this.withheldFiles[path] = fileTimestamps[path];
        fileTimestamps[path] = 1;
        this.emit('fileWithheld', path);
        this.emit('pathWithheld', path);
      });
      dirsModified.filter(path => !this.shouldForwardChange(path)).forEach(path => {
				this.withheldDirs[path] = dirTimestamps[path];
        dirTimestamps[path] = 1;
        this.emit('directoryWithheld', path);
        this.emit('pathWithheld', path);
      });

			callback(err, filesModified.filter(path => this.shouldForwardChange(path)), dirsModified.filter(path => this.shouldForwardChange(path)), missingModified, fileTimestamps, dirTimestamps);
		}, (fileName, changeTime) => {
      // TODO: Figure out if this is worth passing through. It's possible this file could be withheld between this callback, and the aggregate event.
      if (this.shouldForwardChange(fileName)) {
        callbackUndelayed(fileName, changeTime);
      }
    });
	}

  shouldForwardChange(path) {
    if (!this.forwardCache.hasOwnProperty(path)) {
      if (this.forwardByDefault) {
        return !this.withholdPaths.some(p => p instanceof RegExp ? p.test(path) : path.indexOf(p) === 0);
      } else {
        return this.forwardPaths.some(p => p instanceof RegExp ? p.test(path) : path.indexOf(p) === 0);
      }
    }
    return this.forwardCache[path];
  }

  forwardAllWithheldChanges() {
    const files = Object.keys(this.withheldFiles);
    const fileTimestamps = Object.assign({}, this.fileTimestamps);
    files.forEach(path => { fileTimestamps[path] = this.withheldFiles[path]; });

    const dirs = Object.keys(this.withheldDirs);
    const dirTimestamps = Object.assign({}, this.dirTimestamps);
    files.forEach(path => { dirTimestamps[path] = this.withheldDirs[path]; });

    this.callback(null, files, dirs, [], fileTimestamps, dirTimestamps);

    this.withheldChanges = {
      files: {},
      dirs: {}
    };
		this.emit('forwarded');
  }

	forwardWithheldFile(path) {
		if (this.withheldFiles.hasOwnProperty(path)) {
			const fileTimestamps = Object.assign({}, this.fileTimestamps);
			fileTimestamps[path] = this.withheldFiles[path];
			this.callback(null, [path], [], [], fileTimestamps, this.dirTimestamps);
			delete this.withheldFiles[path];
			this.emit('forwarded');
		}
	}

	forwardWithheldDirectory(path) {
		if (this.withheldDirs.hasOwnProperty(path)) {
			const dirTimestamps = Object.assign({}, this.dirTimestamps);
			dirTimestamps[path] = this.withheldDirs[path];
			this.callback(null, [path], [], [], this.fileTimestamps, dirTimestamps);
			delete this.withheldDirs[path];
			this.emit('forwarded');
		}
	}
}
