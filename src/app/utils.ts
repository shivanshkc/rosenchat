export const tc = async <T>(p: Promise<T>): Promise<[T, undefined] | [undefined, Error]> => {
  try {
    return [await p, undefined];
  } catch (err) {
    return [undefined, err as Error];
  }
};
