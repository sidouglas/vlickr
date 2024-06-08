import type { ZodTypeAny, z } from 'zod';

export const createFetch = <Output extends ZodTypeAny>(
  zodSchema: Output
): ((input: RequestInfo | URL, init?: RequestInit) => Promise<z.infer<Output>>) => {
  return function doFetch(input, init) {
    return fetch(input, init).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json().then((data: unknown) => {
        const result = zodSchema.safeParse(data);
        if (result.success) {
          return result.data as z.infer<Output>;
        } else {
          throw result.error.format();
        }
      });
    });
  };
};
