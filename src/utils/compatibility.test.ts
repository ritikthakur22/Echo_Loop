import { describe, expect, it } from 'vitest';
import { getCompatibility } from './compatibility';
describe('browser compatibility detection', () => { it('always returns an actionable status', () => { const result = getCompatibility(); expect(typeof result.supported).toBe('boolean'); expect(result.message.length).toBeGreaterThan(0); }); });
