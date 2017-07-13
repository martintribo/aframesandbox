var parser = require('html2hscript');

module.exports = function(source) {
  this.cacheable();

  parser(source, (err, hscript) => {
    if (err == null) {
      this.callback(null, 'var h = require("virtual-dom/h");\nmodule.exports = ' + hscript + ';');
    } else {
      this.callback(err);
    }
  });
};
