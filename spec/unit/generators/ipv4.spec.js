var ipv4Generator = require('../../../lib/generators/ipv4');

describe("IPv4 Generator", function() {
  it("should always match the IPv4 regex", function() {
    expect(ipv4Generator()).toMatch(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/);
  });
});
