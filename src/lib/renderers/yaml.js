import yaml from 'yaml';
import { YAMLMap, YAMLSeq } from 'yaml/types';
import optionAPI from '../api/option';

function getIn(obj, path) {
  return path.reduce((v, k) => (k in v ? v[k] : {}), obj);
}

function addComments(context, path, commentNode, iterNode = commentNode) {
  const { title, description, comment } = getIn(context, path);
  const lines = [];

  if (optionAPI('renderTitle') && title) {
    lines.push(` ${title}`, '');
  }
  if (optionAPI('renderDescription') && description) {
    lines.push(` ${description}`);
  }
  if (optionAPI('renderComment') && comment) {
    lines.push(` ${comment}`);
  }

  commentNode.commentBefore = lines.join('\n');

  if (iterNode instanceof YAMLMap) {
    iterNode.items.forEach(n => {
      addComments(context, [...path, 'items', n.key.value], n.key, n.value);
    });
  } else if (iterNode instanceof YAMLSeq) {
    iterNode.items.forEach((n, i) => {
      addComments(context, [...path, 'items', i], n);
    });
  }
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
