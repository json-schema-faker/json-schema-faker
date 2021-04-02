import yaml from 'yaml';
import optionAPI from '../api/option';

function getIn(obj, path) {
  return path.reduce((v, k) => (k in v ? v[k] : undefined), obj);
}

function addComments(context, path, node) {
  const { title, description, comment } = getIn(context, path);
  const lines = [];

  if (optionAPI('renderTitle') && title) {
    lines.push(title, '');
  }
  if (optionAPI('renderDescription') && description) {
    lines.push(description);
  }
  if (optionAPI('renderComment') && comment) {
    lines.push(comment);
  }

  node.commentBefore = lines.join('\n');

  (node.items || []).forEach(({ key, value }) => {
    addComments(context, [...path, key], value);
  });
}

/** Render YAML string from the generated value and context
 *
 * @param value
 * @param context
 * @returns {string}
 */
function renderYAML({ value, context }) {
  const nodes = yaml.createNode(value);

  addComments(context, [], nodes);

  const doc = new yaml.Document();
  doc.contents = nodes;

  return doc.toString();
}

export default renderYAML;
