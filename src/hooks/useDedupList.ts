import { useState } from "react";

export default function useDedupList<T>(
  initialValue: T[] = []
): [T[], (item: T) => void, (item: T) => void] {
  const [list, setList] = useState(initialValue);

  function append(itemToAppend: T): void {
    if (!list.includes(itemToAppend)) {
      setList(list => [...list, itemToAppend]);
    }
  }

  function remove(itemToRemove: T): void {
    setList(list => list.filter(item => item !== itemToRemove));
  }

  return [list, append, remove];
}
