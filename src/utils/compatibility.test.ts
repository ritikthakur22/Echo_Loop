import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getCompatibility } from './compatibility';

describe('browser compatibility detection', () => {
  const originalIsSecureContext = window.isSecureContext;

  beforeEach(() => {
    Object.defineProperty(window, 'isSecureContext', {
      value: true,
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'isSecureContext', {
      value: originalIsSecureContext,
      configurable: true,
      writable: true,
    });
  });

  it('returns actionable status object with boolean and message', () => {
    const result = getCompatibility();
    expect(typeof result.supported).toBe('boolean');
    expect(result.message.length).toBeGreaterThan(0);
  });

  it('handles secure and localhost environments', () => {
    // In test environment (localhost/jsdom), localhost is treated as secure context
    const result = getCompatibility();
    expect(result).toHaveProperty('supported');
    expect(result).toHaveProperty('message');
  });
});
