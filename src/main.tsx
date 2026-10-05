import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/provider/AuthProvider.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import SEOComponent from "./components/SEOComponent.tsx";
import { HelmetProvider } from "react-helmet-async";
import { I18nProvider } from "./i18n/I18nProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ErrorBoundary>
          <I18nProvider>
            <AuthProvider>
              <SEOComponent>
                <App />
              </SEOComponent>
            </AuthProvider>
          </I18nProvider>
        </ErrorBoundary>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
