import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <App />

    <Toaster
  position="top-right"
  reverseOrder={false}
  toastOptions={{
    duration: 2500,
    style: {
      background: "#ffffff",
      color: "#1e293b",
      borderRadius: "14px",
      padding: "16px",
      fontSize: "15px",
      fontWeight: "500",
      boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    },
    success: {
      iconTheme: {
        primary: "#22c55e",
        secondary: "#ffffff",
      },
    },
    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#ffffff",
      },
    },
  }}
/>

  </StrictMode>
);