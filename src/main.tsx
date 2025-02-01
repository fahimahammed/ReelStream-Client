import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routers from "./routes/index.tsx";
import "./index.css";
import UserProvider from "./context/user.context.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  </StrictMode>
);
