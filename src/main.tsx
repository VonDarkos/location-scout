import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./app/router/router"; 
import { queryClient } from "./app/queryClient/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import SlowApiNotice from "./app/layouts/SlowApiNotice";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <SlowApiNotice />
    </QueryClientProvider>
  </StrictMode>,
);
