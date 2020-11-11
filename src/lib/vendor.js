import $RefParser_ from 'json-schema-ref-parser';
import JSONPath_ from 'jsonpath-plus';

export const $RefParser = typeof window !== 'undefined' ? window.$RefParser : $RefParser_;
export const JSONPath = typeof window !== 'undefined' ? window.JSONPath : JSONPath_;
