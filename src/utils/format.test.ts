import { describe, expect, it } from 'vitest';
import { formatDelay } from './format';
describe('formatDelay', () => { it('formats milliseconds below one second', () => expect(formatDelay(180)).toBe('180 ms')); it('formats whole seconds', () => expect(formatDelay(2000)).toBe('2 s')); });
