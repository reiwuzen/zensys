import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "sonner/dist/sonner.css";
import { Toaster } from "sonner";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster  position="top-center"
      richColors
      theme="dark"
      duration={3000}
      visibleToasts={4} />
    <App />
  </React.StrictMode>,
);
