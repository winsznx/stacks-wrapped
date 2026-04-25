import { useEffect, useLayoutEffect } from "react";

/**
 * Uses `useLayoutEffect` on the client and `useEffect` on the server
 * to avoid SSR hydration warnings in Next.js.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
