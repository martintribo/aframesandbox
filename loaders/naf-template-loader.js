var uids = 0;
module.exports = function(source) {
  // this.cacheable(); Not cacheable due to uid handling

  var templateUid = 'naftl-' + ++uids;
  var nafTemplateUid = 'naftl-' + ++uids;

  source = 'var nafTemplateId = "#' + nafTemplateUid + '";\n' + source;

  source += [
    'var el = document.createElement("script");',
    'el.id = "' + templateUid + '";',
    'el.setAttribute("type", "text/html");',
    'el.innerHTML = template;',
    'document.head.appendChild(el);', // Most examples load script templates in a-assets. It shouldn't matter though, all the data is in the element already

    'el = document.createElement("script");',
    'el.id = "' + nafTemplateUid + '";',
    'el.setAttribute("type", "text/html");',
    'el.innerHTML = nafTemplate;',
    'document.head.appendChild(el);', // Most examples load script templates in a-assets. It shouldn't matter though, all the data is in the element already

    'schema.template = "#' + nafTemplateUid + '";',
    'NAF.schemas.add(schema);',

    'export { el as element };',
    'export default "#' + templateUid + '";'
  ].join('\n');

  return source;
};
