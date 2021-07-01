import { expect } from 'chai';
import yamlRenderer from '../../../src/lib/renderers/yaml';
import optionAPI from '../../../src/lib/api/option';

/* global describe, it */

describe('YAML Renderer', () => {
  it('should render a nice document', () => {
    expect(yamlRenderer({
      value: {
        foo: 'bar',
        tlk: {
          deeperKey: 2,
        },
      },
      context: {
        items: {
          foo: {
            title: 'A foo title',
          },
          tlk: {
            title: 'Top Level Key',
            description: 'TLKs can also have descriptions!',
            comment: 'a not rendered comment',
            items: {
              deeperKey: {
                description: 'deeper nested key',
              },
            },
          },
        },
      },
    })).to.eql(`# A foo title
#
foo: bar
# Top Level Key
#
# TLKs can also have descriptions!
tlk:
  # deeper nested key
  deeperKey: 2
`);
  });

  it('should render comments if configured so', () => {
    const prevOptionValue = optionAPI('renderComment');
    optionAPI('renderComment', true);

    expect(yamlRenderer({
      value: {
        key: 1,
      },
      context: {
        items: {
          key: {
            comment: 'a comment on key',
          },
        },
      },
    })).to.eq(`# a comment on key
key: 1
`);

    optionAPI('renderComment', prevOptionValue);
  });

  it('should render arrays', () => {
    expect(yamlRenderer({
      value: [0],
      context: {
        items: [{
          title: 'First array element',
        }],
      },
    })).to.eq(`# First array element
#
- 0
`);
  });

  it('should render top level object context', () => {
    expect(yamlRenderer({
      value: {
        foo: 'bar',
      },
      context: {
        title: 'Top level title',
        items: {
          foo: {
            title: 'Title',
          },
        },
      },
    })).to.eq(`# Top level title
#
# Title
#
foo: bar
`);
  });

  it('should render top level scalar', () => {
    expect(yamlRenderer({
      value: 1,
      context: {
        description: 'one',
      },
    })).to.eq(`# one
1
`);
  });
});
