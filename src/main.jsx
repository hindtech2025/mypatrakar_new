import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
const rootElement = document.getElementById("root");
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

createRoot(rootElement).render(

    <HelmetProvider>
       <AuthProvider>
        <App/>
       </AuthProvider>
    
    </HelmetProvider>
 
);
