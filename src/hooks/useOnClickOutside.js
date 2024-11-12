import { useEffect } from "react";

/**
 * @link https://usehooks.com/useOnClickOutside/
 */
export default function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        if(Array.isArray(ref)) {
          if(ref.some(r => r.current && r.current.contains(event.target))) {
            return
          }
        }
        else if (!ref.current || ref.current.contains(event.target)) {
          return
        }
        handler(event)
      }

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },

    [ref, handler]
  );
}