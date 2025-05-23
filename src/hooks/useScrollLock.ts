import { useEffect } from "react";

export const useScrollLock = (lock: boolean) => {
  useEffect(() => {
    if (lock) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.touchAction = "none";
    } else {
      document.documentElement.style.overflow = "";
      document.documentElement.style.touchAction = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.touchAction = "";
    };
  }, [lock]);
};
