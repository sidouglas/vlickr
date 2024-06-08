import { act } from 'react';

export const runOnlyPendingTimersAsync = () =>
  act(async () => {
    await vi.runOnlyPendingTimersAsync();
  });
