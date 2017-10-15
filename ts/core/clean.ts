// TODO: tsify

function isArray(obj) {
  return obj && Array.isArray(obj);
}

function isObject(obj) {
  return obj && obj !== null && typeof obj === 'object';
}

function hasNothing(obj) {
  if (isArray(obj)) {
    return obj.length === 0;
  }

  if (isObject(obj)) {
    return Object.keys(obj).length === 0;
  }

  return typeof obj === 'undefined' || obj === null;
}

function removeProps(obj, key?, parent?, required?) {
  var i,
      value,
      isFullyEmpty = true;

  if (isArray(obj)) {
    for (i = 0; i < obj.length; ++i) {
      value = obj[i];

      if (isObject(value)) {
        removeProps(value, i, obj);
      }

      if (hasNothing(value)) {
        obj.splice(i--, 1);
      } else {
        isFullyEmpty = false;
      }
    }
  } else {
    for (i in obj) {
      value = obj[i];

      if (required && required.indexOf(i) > -1) {
        isFullyEmpty = false;
        removeProps(value);
        continue;
      }

      if (isObject(value)) {
        removeProps(value, i, obj);
      }

      if (hasNothing(value)) {
        delete obj[i];
      } else {
        isFullyEmpty = false;
      }
    }
  }

  if (typeof key !== 'undefined' && isFullyEmpty) {
    delete parent[key];
    removeProps(obj);
  }
}

export default function(obj: any, required?: Array<string>) {
  removeProps(obj, undefined, undefined, required);
  return obj;
};
