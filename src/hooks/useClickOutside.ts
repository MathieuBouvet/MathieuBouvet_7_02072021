import { useRef, useEffect } from "react";

export function useClickOutside(callback: Function) {
  const ref = useRef<any>();

  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  });

  return ref;
}
