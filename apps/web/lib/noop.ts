/** Type-safe no-operation function */
export function noop(): void {}

/** Async no-operation function for promise-based APIs */
export async function asyncNoop(): Promise<void> {}

/** Identity function that returns its input unchanged */
export function identity<T>(value: T): T {
  return value;
}
