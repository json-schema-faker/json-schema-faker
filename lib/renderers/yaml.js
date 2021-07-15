const yaml = require("yaml");
const { YAMLMap, YAMLSeq } = require("yaml/types");
const optionAPI = require("../api/option");
function getIn(obj, path) {
  return path.reduce((v, k) => k in v ? v[k] : {}, obj);
}
function addComments(context, path, commentNode, iterNode = commentNode) {
  const { title, description, comment } = getIn(context, path);
  const lines = [];
  if (optionAPI("renderTitle") && title) {
    lines.push(` ${title}`, "");
  }
  if (optionAPI("renderDescription") && description) {
    lines.push(` ${description}`);
  }
  if (optionAPI("renderComment") && comment) {
    lines.push(` ${comment}`);
  }
  commentNode.commentBefore = lines.join("\n");
  if (iterNode instanceof YAMLMap) {
    iterNode.items.forEach((n) => {
      addComments(context, [...path, "items", n.key.value], n.key, n.value);
    });
  } else if (iterNode instanceof YAMLSeq) {
    iterNode.items.forEach((n, i) => {
      addComments(context, [...path, "items", i], n);
    });
  }
}
function renderYAML({ value, context }) {
  const nodes = yaml.createNode(value);
  addComments(context, [], nodes);
  const doc = new yaml.Document();
  doc.contents = nodes;
  return doc.toString();
}
var yaml_default = renderYAML;
module.exports=yaml_default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvcmVuZGVyZXJzL3lhbWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHlhbWwgZnJvbSAneWFtbCc7XG5pbXBvcnQgeyBZQU1MTWFwLCBZQU1MU2VxIH0gZnJvbSAneWFtbC90eXBlcyc7XG5pbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24nO1xuXG5mdW5jdGlvbiBnZXRJbihvYmosIHBhdGgpIHtcbiAgcmV0dXJuIHBhdGgucmVkdWNlKCh2LCBrKSA9PiAoayBpbiB2ID8gdltrXSA6IHt9KSwgb2JqKTtcbn1cblxuZnVuY3Rpb24gYWRkQ29tbWVudHMoY29udGV4dCwgcGF0aCwgY29tbWVudE5vZGUsIGl0ZXJOb2RlID0gY29tbWVudE5vZGUpIHtcbiAgY29uc3QgeyB0aXRsZSwgZGVzY3JpcHRpb24sIGNvbW1lbnQgfSA9IGdldEluKGNvbnRleHQsIHBhdGgpO1xuICBjb25zdCBsaW5lcyA9IFtdO1xuXG4gIGlmIChvcHRpb25BUEkoJ3JlbmRlclRpdGxlJykgJiYgdGl0bGUpIHtcbiAgICBsaW5lcy5wdXNoKGAgJHt0aXRsZX1gLCAnJyk7XG4gIH1cbiAgaWYgKG9wdGlvbkFQSSgncmVuZGVyRGVzY3JpcHRpb24nKSAmJiBkZXNjcmlwdGlvbikge1xuICAgIGxpbmVzLnB1c2goYCAke2Rlc2NyaXB0aW9ufWApO1xuICB9XG4gIGlmIChvcHRpb25BUEkoJ3JlbmRlckNvbW1lbnQnKSAmJiBjb21tZW50KSB7XG4gICAgbGluZXMucHVzaChgICR7Y29tbWVudH1gKTtcbiAgfVxuXG4gIGNvbW1lbnROb2RlLmNvbW1lbnRCZWZvcmUgPSBsaW5lcy5qb2luKCdcXG4nKTtcblxuICBpZiAoaXRlck5vZGUgaW5zdGFuY2VvZiBZQU1MTWFwKSB7XG4gICAgaXRlck5vZGUuaXRlbXMuZm9yRWFjaChuID0+IHtcbiAgICAgIGFkZENvbW1lbnRzKGNvbnRleHQsIFsuLi5wYXRoLCAnaXRlbXMnLCBuLmtleS52YWx1ZV0sIG4ua2V5LCBuLnZhbHVlKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChpdGVyTm9kZSBpbnN0YW5jZW9mIFlBTUxTZXEpIHtcbiAgICBpdGVyTm9kZS5pdGVtcy5mb3JFYWNoKChuLCBpKSA9PiB7XG4gICAgICBhZGRDb21tZW50cyhjb250ZXh0LCBbLi4ucGF0aCwgJ2l0ZW1zJywgaV0sIG4pO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKiBSZW5kZXIgWUFNTCBzdHJpbmcgZnJvbSB0aGUgZ2VuZXJhdGVkIHZhbHVlIGFuZCBjb250ZXh0XG4gKlxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gY29udGV4dFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcmVuZGVyWUFNTCh7IHZhbHVlLCBjb250ZXh0IH0pIHtcbiAgY29uc3Qgbm9kZXMgPSB5YW1sLmNyZWF0ZU5vZGUodmFsdWUpO1xuXG4gIGFkZENvbW1lbnRzKGNvbnRleHQsIFtdLCBub2Rlcyk7XG5cbiAgY29uc3QgZG9jID0gbmV3IHlhbWwuRG9jdW1lbnQoKTtcbiAgZG9jLmNvbnRlbnRzID0gbm9kZXM7XG5cbiAgcmV0dXJuIGRvYy50b1N0cmluZygpO1xufVxuXG5leHBvcnQgZGVmYXVsdCByZW5kZXJZQU1MO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFFQSxlQUFlLEtBQUssTUFBTTtBQUN4QixTQUFPLEtBQUssT0FBTyxDQUFDLEdBQUcsTUFBTyxLQUFLLElBQUksRUFBRSxLQUFLLElBQUs7QUFBQTtBQUdyRCxxQkFBcUIsU0FBUyxNQUFNLGFBQWEsV0FBVyxhQUFhO0FBQ3ZFLFFBQU0sRUFBRSxPQUFPLGFBQWEsWUFBWSxNQUFNLFNBQVM7QUFDdkQsUUFBTSxRQUFRO0FBRWQsTUFBSSxVQUFVLGtCQUFrQixPQUFPO0FBQ3JDLFVBQU0sS0FBSyxJQUFJLFNBQVM7QUFBQTtBQUUxQixNQUFJLFVBQVUsd0JBQXdCLGFBQWE7QUFDakQsVUFBTSxLQUFLLElBQUk7QUFBQTtBQUVqQixNQUFJLFVBQVUsb0JBQW9CLFNBQVM7QUFDekMsVUFBTSxLQUFLLElBQUk7QUFBQTtBQUdqQixjQUFZLGdCQUFnQixNQUFNLEtBQUs7QUFFdkMsTUFBSSxvQkFBb0IsU0FBUztBQUMvQixhQUFTLE1BQU0sUUFBUSxPQUFLO0FBQzFCLGtCQUFZLFNBQVMsQ0FBQyxHQUFHLE1BQU0sU0FBUyxFQUFFLElBQUksUUFBUSxFQUFFLEtBQUssRUFBRTtBQUFBO0FBQUEsYUFFeEQsb0JBQW9CLFNBQVM7QUFDdEMsYUFBUyxNQUFNLFFBQVEsQ0FBQyxHQUFHLE1BQU07QUFDL0Isa0JBQVksU0FBUyxDQUFDLEdBQUcsTUFBTSxTQUFTLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFXbEQsb0JBQW9CLEVBQUUsT0FBTyxXQUFXO0FBQ3RDLFFBQU0sUUFBUSxLQUFLLFdBQVc7QUFFOUIsY0FBWSxTQUFTLElBQUk7QUFFekIsUUFBTSxNQUFNLElBQUksS0FBSztBQUNyQixNQUFJLFdBQVc7QUFFZixTQUFPLElBQUk7QUFBQTtBQUdiLElBQU8sZUFBUTsiLCJuYW1lcyI6W119
