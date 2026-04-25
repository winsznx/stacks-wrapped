"use client";
import { useEffect, type RefObject } from "react";

export function useClickOutside<T extends HTMLElement>(
  refs: RefObject<T | null> | RefObject<T | null>[],
  handler: (event: MouseEvent | TouchEvent) => void,
): void {
  useEffect(() => {
    const refArray = Array.isArray(refs) ? refs : [refs];

    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const isInside = refArray.some((ref) => ref.current?.contains(target));
      if (!isInside) handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler]);
}
