import { fixture, expect, html } from '@open-wc/testing';

describe('Simple test', () => {
  it('should work', async () => {
    const el = await fixture(html`<div>Hello</div>`);
    expect(el.textContent).to.equal('Hello');
  });
});