export function dedupList<T>(list: T[]): T[] {
  return Array.from(new Set(list));
}

