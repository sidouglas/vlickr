import { defaultState, useStore } from '@/store';
import '@testing-library/jest-dom/vitest';

vi.mock('./__mocks__/zustand.ts');

beforeAll(() => {
  vi.useFakeTimers();
});

beforeEach(() => {
  useStore.setState(defaultState);
});

afterEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
  vi.resetAllMocks();
});

afterAll(() => {
  vi.useRealTimers();
});
