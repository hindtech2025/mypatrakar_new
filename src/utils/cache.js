// utils/cache.js
const memo = new Map();

export function cacheAsync(fn) {
  return async function (...args) {
    const key = JSON.stringify(args);
    if (!memo.has(key)) {
      const promise = fn(...args);
      memo.set(key, promise); // promise bhi cache ho sakta ha
    }
    return memo.get(key);
  };
}
