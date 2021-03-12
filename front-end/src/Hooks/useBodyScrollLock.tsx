import { useLayoutEffect } from "react";

export const useLockBodyScroll = (activated: boolean) => {
  useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (activated) {
      // Prevent scrolling on mount
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = originalStyle;
    }
  }, [activated]);
};
