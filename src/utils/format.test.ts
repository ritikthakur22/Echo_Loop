import { describe, expect, it } from 'vitest';
import { formatDelay } from './format';

describe('formatDelay', () => {
  it('formats milliseconds below one second', () => {
    expect(formatDelay(50)).toBe('50 ms');
    expect(formatDelay(180)).toBe('180 ms');
    expect(formatDelay(750)).toBe('750 ms');
    expect(formatDelay(999)).toBe('999 ms');
  });

  it('formats exact whole seconds without unnecessary decimals', () => {
    expect(formatDelay(1000)).toBe('1 s');
    expect(formatDelay(2000)).toBe('2 s');
    expect(formatDelay(3000)).toBe('3 s');
  });

  it('formats fractional seconds with one decimal place', () => {
    expect(formatDelay(1500)).toBe('1.5 s');
    expect(formatDelay(2200)).toBe('2.2 s');
    expect(formatDelay(2750)).toBe('2.8 s');
  });
});
