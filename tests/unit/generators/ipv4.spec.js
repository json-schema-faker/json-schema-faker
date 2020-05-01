import { expect } from 'chai';
import ipv4Generator from '../../../src/lib/generators/ipv4';

describe('IPv4 Generator', () => {
  it('should always match the IPv4 regex', () => {
    expect(ipv4Generator()).to.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/);
  });
});
