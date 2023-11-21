import { Selector } from 'testcafe';

/* global fixture */

fixture('Smoke Tests')
  .page('http://localhost:8080');

test('Should load as expected!', async t => {
  await t.expect(Selector('code').withText('const: 42').exists).ok();
});
