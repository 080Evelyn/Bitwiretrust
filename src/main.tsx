import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.tsx";
import { PinModalProvider } from "./hooks/PinModalProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Toaster } from "./Components/ui/sonner.tsx";
import { UserProvider } from "./context/userContext.tsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <PinModalProvider>
            <RouterProvider router={router} />
          </PinModalProvider>
        </UserProvider>
      </AuthProvider>

      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
