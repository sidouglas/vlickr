import { configure } from 'safe-stable-stringify';

export const DEFAULT_ELEMENT = 'div';
export const FN_ANONYMOUS = '*anonymous*';
export const FN_PREFIX = 'fn:';
export const IGNORED = '**ignored**';
export const TEST_SUFFIX = ['.test.tsx', '.tsx'] as const;
export const stringify = configure({
  circularValue: '**circular**',
  deterministic: true,
});
