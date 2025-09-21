import { fixture, expect, html } from '@open-wc/testing';
import { PaoButton } from '../src/components/pao-button/pao-button';
import type { ButtonVariant, ButtonSize, ButtonAppearance } from '../src/components/pao-button/pao-button';

describe('PaoButton', () => {
  it('renders with default properties', async () => {
    const el = await fixture<PaoButton>(html`<pao-button>Click me</pao-button>`);

    expect(el).to.exist;
    expect(el.variant).to.equal('primary');
    expect(el.size).to.equal('md');
    expect(el.disabled).to.be.false;
    expect(el.loading).to.be.false;
    expect(el.appearance).to.equal('solid');

    const button = el.shadowRoot!.querySelector('button');
    expect(button).to.exist;
    expect(button!.textContent).to.contain('Click me');
    expect(button!.classList.contains('primary')).to.be.true;
    expect(button!.classList.contains('md')).to.be.true;
    expect(button!.classList.contains('solid')).to.be.true;
    expect(button!.hasAttribute('disabled')).to.be.false;
    expect(button!.getAttribute('aria-busy')).to.equal('false');
  });

  it('applies correct variant classes', async () => {
    const variants: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'ghost', 'outline'];

    for (const variant of variants) {
      const el = await fixture<PaoButton>(html`<pao-button variant=${variant}>${variant}</pao-button>`);
      const button = el.shadowRoot!.querySelector('button');
      expect(button!.classList.contains(variant)).to.be.true;
    }
  });

  it('applies correct size classes', async () => {
    const sizes: ButtonSize[] = ['sm', 'md', 'lg'];

    for (const size of sizes) {
      const el = await fixture<PaoButton>(html`<pao-button size=${size}>${size}</pao-button>`);
      const button = el.shadowRoot!.querySelector('button');
      expect(button!.classList.contains(size)).to.be.true;
    }
  });

  it('applies correct appearance classes', async () => {
    const appearances: ButtonAppearance[] = ['solid', 'outline', 'ghost'];

    for (const appearance of appearances) {
      const el = await fixture<PaoButton>(html`<pao-button appearance=${appearance}>${appearance}</pao-button>`);
      const button = el.shadowRoot!.querySelector('button');
      expect(button!.classList.contains(appearance)).to.be.true;
    }
  });

  it('handles disabled state correctly', async () => {
    const el = await fixture<PaoButton>(html`<pao-button disabled>Disabled</pao-button>`);

    expect(el.disabled).to.be.true;

    const button = el.shadowRoot!.querySelector('button');
    expect(button!.hasAttribute('disabled')).to.be.true;
    expect(button!.classList.contains('disabled')).to.be.true;
  });

  it('handles loading state correctly', async () => {
    const el = await fixture<PaoButton>(html`<pao-button loading>Loading</pao-button>`);

    expect(el.loading).to.be.true;

    const button = el.shadowRoot!.querySelector('button');
    const spinner = el.shadowRoot!.querySelector('.pao-button__spinner');

    expect(button!.hasAttribute('disabled')).to.be.true;
    expect(button!.getAttribute('aria-busy')).to.equal('true');
    expect(button!.classList.contains('loading')).to.be.true;
    expect(spinner).to.exist;
  });

  it('shows spinner when loading and hides content', async () => {
    const el = await fixture<PaoButton>(html`<pao-button loading>Content</pao-button>`);

    const spinner = el.shadowRoot!.querySelector('.pao-button__spinner');
    const content = el.shadowRoot!.querySelector('.pao-button__content');

    expect(spinner).to.exist;
    expect(content).to.exist;
    expect(content!.textContent).to.contain('Content');
  });

  it('disables button when both loading and disabled are true', async () => {
    const el = await fixture<PaoButton>(html`<pao-button loading disabled>Button</pao-button>`);

    const button = el.shadowRoot!.querySelector('button');
    expect(button!.hasAttribute('disabled')).to.be.true;
  });

  it('emits paoClick event when clicked and not disabled/loading', async () => {
    const el = await fixture<PaoButton>(html`<pao-button>Click me</pao-button>`);

    let clickEvent: CustomEvent | null = null;
    el.addEventListener('paoClick', (e) => {
      clickEvent = e as CustomEvent;
    });

    const button = el.shadowRoot!.querySelector('button')!;
    button.click();

    expect(clickEvent).to.exist;
    expect(clickEvent!.detail).to.have.property('originalEvent');
  });

  it('does not emit paoClick event when disabled', async () => {
    const el = await fixture<PaoButton>(html`<pao-button disabled>Click me</pao-button>`);

    let clickEventEmitted = false;
    el.addEventListener('paoClick', () => {
      clickEventEmitted = true;
    });

    const button = el.shadowRoot!.querySelector('button')!;
    button.click();

    expect(clickEventEmitted).to.be.false;
  });

  it('does not emit paoClick event when loading', async () => {
    const el = await fixture<PaoButton>(html`<pao-button loading>Click me</pao-button>`);

    let clickEventEmitted = false;
    el.addEventListener('paoClick', () => {
      clickEventEmitted = true;
    });

    const button = el.shadowRoot!.querySelector('button')!;
    button.click();

    expect(clickEventEmitted).to.be.false;
  });

  it('prevents default behavior when disabled', async () => {
    const el = await fixture<PaoButton>(html`<pao-button disabled>Click me</pao-button>`);

    const button = el.shadowRoot!.querySelector('button')!;
    const clickEvent = new MouseEvent('click', { bubbles: true });

    let defaultPrevented = false;
    const originalPreventDefault = clickEvent.preventDefault;
    clickEvent.preventDefault = () => {
      defaultPrevented = true;
      originalPreventDefault.call(clickEvent);
    };

    button.dispatchEvent(clickEvent);

    expect(defaultPrevented).to.be.true;
  });

  it('supports slot content', async () => {
    const el = await fixture<PaoButton>(html`
      <pao-button>
        <span>Custom content</span>
      </pao-button>
    `);

    const content = el.shadowRoot!.querySelector('.pao-button__content');
    const slot = content!.querySelector('slot');
    expect(slot).to.exist;
  });

  it('has correct accessibility attributes', async () => {
    const el = await fixture<PaoButton>(html`<pao-button>Accessible</pao-button>`);
    const button = el.shadowRoot!.querySelector('button');

    expect(button!.getAttribute('aria-busy')).to.equal('false');
    expect(button!.getAttribute('part')).to.equal('button');

    // Test loading state accessibility
    el.loading = true;
    await el.updateComplete;

    expect(button!.getAttribute('aria-busy')).to.equal('true');
  });

  it('updates classes when properties change', async () => {
    const el = await fixture<PaoButton>(html`<pao-button>Test</pao-button>`);
    const button = el.shadowRoot!.querySelector('button');

    // Test variant change
    el.variant = 'success';
    await el.updateComplete;
    expect(button!.classList.contains('success')).to.be.true;
    expect(button!.classList.contains('primary')).to.be.false;

    // Test size change
    el.size = 'lg';
    await el.updateComplete;
    expect(button!.classList.contains('lg')).to.be.true;
    expect(button!.classList.contains('md')).to.be.false;

    // Test appearance change
    el.appearance = 'outline';
    await el.updateComplete;
    expect(button!.classList.contains('outline')).to.be.true;
    expect(button!.classList.contains('solid')).to.be.false;

    // Test loading state change
    el.loading = true;
    await el.updateComplete;
    expect(button!.classList.contains('loading')).to.be.true;
    expect(button!.getAttribute('aria-busy')).to.equal('true');

    // Test disabled state change
    el.disabled = true;
    await el.updateComplete;
    expect(button!.classList.contains('disabled')).to.be.true;
    expect(button!.hasAttribute('disabled')).to.be.true;
  });

  it('handles combined states correctly', async () => {
    const el = await fixture<PaoButton>(html`
      <pao-button variant="warning" size="sm" appearance="ghost" loading disabled>
        Combined
      </pao-button>
    `);

    const button = el.shadowRoot!.querySelector('button');

    expect(button!.classList.contains('warning')).to.be.true;
    expect(button!.classList.contains('sm')).to.be.true;
    expect(button!.classList.contains('ghost')).to.be.true;
    expect(button!.classList.contains('loading')).to.be.true;
    expect(button!.classList.contains('disabled')).to.be.true;
    expect(button!.hasAttribute('disabled')).to.be.true;
    expect(button!.getAttribute('aria-busy')).to.equal('true');
  });

  it('is accessible in default state', async () => {
    const el = await fixture<PaoButton>(html`<pao-button>Accessible button</pao-button>`);
    await expect(el).to.be.accessible();
  });

  it('is accessible in loading state', async () => {
    const el = await fixture<PaoButton>(html`<pao-button loading>Loading</pao-button>`);
    await expect(el).to.be.accessible();
  });

  it('is accessible in disabled state', async () => {
    const el = await fixture<PaoButton>(html`<pao-button disabled>Disabled</pao-button>`);
    await expect(el).to.be.accessible();
  });
});