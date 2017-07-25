var uids = 0;
module.exports = function(source) {
  // this.cacheable(); Not cacheable due to uid handling

  var uid = 'naftl-' + ++uids;

  source += [
    'var el = document.createElement("script");',
    'el.id = "' + uid + '";',
    'el.setAttribute("type", "text/html");',
    'el.innerHTML = template;',
    'document.head.appendChild(el);', // Most examples load script templates in a-assets. It shouldn't matter though, all the data is in the element already

    'schema.template = "#' + uid + '";',
    'NAF.schemas.add(schema);',
    'export { el as element };',
    'export default "#' + uid + '";'
  ].join('\n');

  return source;
};
