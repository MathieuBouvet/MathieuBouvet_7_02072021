import { useState } from "react";

/**
 * A hook to handle the state of a list. It is generic over the type of the list items
 * @param initialValue the list will be initialised with this value. Defaults to an empty list
 * @returns A 3-tuple. The first item is the list,  
 * the second is a function to append an item to the list,  
 * and the third is a function to remove an item to the list based on strict equallity check
 */
export default function useList<T>(
  initialValue: T[] = []
): [T[], (item: T) => void, (item: T) => void] {
  const [list, setList] = useState(initialValue);

  function append(itemToAppend: T): void {
    setList(list => [...list, itemToAppend]);
  }

  function remove(itemToRemove: T): void {
    setList(list => list.filter(item => item !== itemToRemove));
  }

  return [list, append, remove];
}
