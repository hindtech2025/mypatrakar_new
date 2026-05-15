import { BrowserRouter, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import useResponsiveFix from "./hooks/useResponsiveFix.js";
import ErrorBoundary from "./utils/ErrorBoundary.jsx";
import { useEffect, Suspense, lazy } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// ✅ Lazy load AppContent
const AppContent = lazy(() => import("./AppComponent.jsx"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <AiOutlineLoading3Quarters className="animate-spin w-14 h-14 text-red-500" />
    </div>
  );
}

function App() {
  const style = {
    fontFamily: "Times New Roman",
  };

  const ready = useResponsiveFix();
  if (!ready) return null;

  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* <ErrorBoundary> */}
        <LanguageProvider>
          <div style={style}>
            <Suspense fallback={<Loader />}>
              <AppContent />
            </Suspense>
          </div>
        </LanguageProvider>
      {/* </ErrorBoundary> */}
    </BrowserRouter>
  );
}

export default App;
