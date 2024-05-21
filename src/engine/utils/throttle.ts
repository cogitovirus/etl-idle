/**
 * Creates a throttled function that only invokes the provided function at most once per every
 * specified number of milliseconds.
 *
 * @param func - The function to throttle.
 * @param interval - The number of milliseconds to throttle executions to.
 * @returns A new throttled function.
 */
export function throttle(func: (...args: any[]) => void, interval: number) {
  let lastExecutionTime = 0;

  return (...args: any[]) => {
    const now = Date.now();

    if (now - lastExecutionTime >= interval) {
      lastExecutionTime = now;
      func(...args);
    }
  };
}
