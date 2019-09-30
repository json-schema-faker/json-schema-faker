import { expect } from 'chai';
import coreFormatGenerator from '../../../src/generators/coreFormat';

/* global describe, it */

describe('coreFormat Generator', () => {
  describe('uuid', () => {
    it('should always match uuid regex', () => {
      expect(coreFormatGenerator('uuid')).to.match(/[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/);
    });

    it('should not be presented in the form of UUID as a URN', () => {
      expect(coreFormatGenerator('uuid')).to.not.include('urn:uuid');
    });
  });
});
