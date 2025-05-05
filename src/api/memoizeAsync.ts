export function memoizeAsync<F extends (...args: any[]) => Promise<any>>(fn: F): F {
  const cache = new Map<string, Promise<ReturnType<F>>>();

  return ((...args: any[]) => {
    const key = JSON.stringify(args);

    if (!cache.has(key)) {
      const promise = fn(...args).catch((err) => {
        cache.delete(key); // Don't cache failed results
        throw err;
      });

      cache.set(key, promise);
    }

    return cache.get(key)!;
  }) as F;
}