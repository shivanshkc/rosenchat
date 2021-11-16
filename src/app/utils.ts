/**
 * @description tc is a try-catch wrapper.
 * @param promise The promise which is to be try-catch-ed.
 */
export const tc = async <T>(
  promise: Promise<T>
): Promise<[undefined, T] | [Error, undefined]> => {
  try {
    return [undefined, await promise];
  } catch (err) {
    return [err as Error, undefined];
  }
};
