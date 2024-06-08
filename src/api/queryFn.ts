type Query = { stat: 'ok' | 'fail'; message?: string };
type RequestFn<T> = (url: string) => Promise<T>;
export const queryFn = <T extends Query>(
  url: string,
  requestFn: RequestFn<T>
): (() => Promise<T>) => {
  return async () => {
    const response = await requestFn(url);
    if (response?.stat === 'ok') {
      return response;
    }
    throw new Error(response?.message ?? 'Unknown error');
  };
};
