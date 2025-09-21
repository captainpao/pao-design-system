import { PaoButton } from '../src/components/pao-button/pao-button';
import { fixture, expect, html } from '@open-wc/testing';

// Simple test to verify the component can be imported and instantiated
describe('PaoButton Node Test', () => {
  it('should be defined', () => {
    expect(PaoButton).to.be.a('function');
  });

  it('should have default properties', () => {
    const button = new PaoButton();
    expect(button.variant).to.equal('primary');
    expect(button.size).to.equal('md');
    expect(button.disabled).to.be.false;
    expect(button.loading).to.be.false;
    expect(button.appearance).to.equal('solid');
  });

  it('should update properties correctly', async () => {
    const button = new PaoButton();
    button.variant = 'success';
    button.size = 'lg';
    button.disabled = true;
    button.loading = true;
    button.appearance = 'outline';

    expect(button.variant).to.equal('success');
    expect(button.size).to.equal('lg');
    expect(button.disabled).to.be.true;
    expect(button.loading).to.be.true;
    expect(button.appearance).to.equal('outline');
  });
});