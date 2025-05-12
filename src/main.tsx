import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.tsx";
import { PinModalProvider } from "./hooks/PinModalProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PinModalProvider>
      <RouterProvider router={router} />
    </PinModalProvider>
  </StrictMode>
);
