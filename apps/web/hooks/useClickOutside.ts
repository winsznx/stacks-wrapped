"use client";

import { RefObject, useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    function listener(event: MouseEvent | TouchEvent) {
      const target = event.target;
      if (!ref.current || !(target instanceof Node)) return;
      if (ref.current.contains(target)) return;
      handler(event);
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
