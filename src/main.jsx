// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./context/CartContext"; // CartProvider ni import qilamiz
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS

const client = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <CartProvider>
          {" "}
          {/* App ni CartProvider bilan o'raymiz */}
          <App />
        </CartProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
