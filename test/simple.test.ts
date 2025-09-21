// Mock Lit dependencies for Jest testing
jest.mock('lit', () => ({
  LitElement: class {
    static styles = [];
  },
  html: jest.fn(),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
}));

describe('Simple test', () => {
  it('should work', () => {
    const el = document.createElement('div');
    el.textContent = 'Hello';
    expect(el.textContent).toBe('Hello');
  });
});