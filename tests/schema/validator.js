import { inspect } from 'util';
import is from 'is-my-json-valid';
import Ajv from 'ajv';
import tv4 from 'tv4';
import clone from 'clone';
import semver from 'semver';
import ZSchema from 'z-schema';

function addValidators(v) {
  const registry = v.addFormat || v.registerFormat;
  const msgOnFail = !v.registerFormat;

  registry.call(v, 'idn-hostname', () => true);
  registry.call(v, 'idn-email', () => true);
  registry.call(v, 'semver', value => {
    let pass;
    let err;

    try {
      pass = semver.valid(value) === value;
    } catch (e) {
      err = e.message;
    }

    if (msgOnFail) {
      // tv4, Jayschema
      if (pass) return null;
      return err;
    }

    // ZSchema
    return pass;
  });
}

export function checkType(sample, type) {
  const test = Object.prototype.toString.call(sample).match(/object (\w+)/);

  if (test[1].toLowerCase() !== type) {
    throw new Error(`Expected ${JSON.stringify(sample)} to be ${type}`);
  }
}

export function checkSchema(sample, schema, refs) {
  const fail = [];
  const fixed = {};

  if (refs) {
    refs.forEach(s => {
      fixed[s.id ? s.id.split('#')[0] : ''] = clone(s);
    });
  }

  // is-my-json-valid
  const v = is(schema, {
    formats: {
      semver: semver.valid,
      'idn-hostname': () => true,
      'idn-email': () => true,
    },
    schemas: fixed,
  });

  if (!v(sample)) {
    // FIXME: https://github.com/mafintosh/is-my-json-valid/issues/172
    if (v.errors[0].field !== 'data.num') {
      v.errors.forEach(e => {
        fail.push(`${e.field.replace('data.', '')} ${e.message}`);
      });
    }
  }

  // z-schema
  const validator = new ZSchema({
    ignoreUnresolvableReferences: true,
  });

  Object.keys(fixed).forEach(k => {
    validator.setRemoteReference(k, fixed[k]);
  });

  let valid;

  try {
    valid = validator.validate(clone(sample), clone(schema));
  } catch (e) {
    fail.push(`[z-schema] ${e.message}`);
  }

  const errors = validator.getLastErrors();

  if (errors || !valid) {
    fail.push((errors || []).map(e => {
      if (e.code === 'PARENT_SCHEMA_VALIDATION_FAILED') {
        return e.inner.map(x => `[z-schema] ${x.message}`).join('\n');
      }

      return `[z-schema] ${e.message}`;
    }).join('\n') || `[z-schema] Invalid schema ${JSON.stringify(sample)}`);
  }

  // tv4
  const api = tv4.freshApi();

  api.banUnknown = false;
  api.cyclicCheck = false;

  Object.keys(fixed).forEach(k => {
    api.addSchema(k, fixed[k]);
  });

  const result = api.validateResult(sample, clone(schema), api.cyclicCheck, api.banUnknown);

  if (result.missing.length) {
    fail.push(`[tv4] Missing ${result.missing.join(', ')}`);
  }

  if (result.error) {
    fail.push(`[tv4] ${result.error}`);
  }

  // ajv
  const ajv = new Ajv({
    validateSchema: false,
    jsonPointers: true,
    logger: false,
    formats: {
      semver: semver.valid,
      'idn-hostname': () => true,
      'idn-email': () => true,
    },
  });

  Object.keys(fixed).forEach(id => {
    ajv.addSchema(fixed[id], id);
  });

  if (!ajv.validate(schema, sample)) {
    ajv.errors.forEach(x => {
      fail.push(`[ajv] ${x.message}`);
    });
  }

  if (fail.length) {
    const a = inspect(sample, true, 15);
    const b = inspect(schema, true, 15);

    throw new Error(`Given sample does not match schema.\n${fail.join('\n')}\n---\n${a}\n---\n${b}\n---\n`);
  }
}

[tv4, ZSchema].map(addValidators);
