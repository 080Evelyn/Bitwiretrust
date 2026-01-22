import React from "react";

export function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
) {
  return React.lazy(() =>
    factory().catch((error) => {
      const hasRetried = sessionStorage.getItem("lazy-retry");

      if (!hasRetried) {
        sessionStorage.setItem("lazy-retry", "true");
        window.location.reload();
      }

      throw error;
    }),
  );
}
