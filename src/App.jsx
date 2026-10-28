import { useEffect, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import { RootLayout } from "./components/layout/RootLayout";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import useLanguageStore from "./store/useLanguageStore";

// Lazy-loaded Public Pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Activities = lazy(() => import("./pages/Activities"));
const ActivityDetailsPage = lazy(() => import("./pages/ActivityDetailsPage"));
const Research = lazy(() => import("./pages/Research"));
const News = lazy(() => import("./pages/News"));
const Donate = lazy(() => import("./pages/Donate"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy-loaded Admin Pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ActivitiesPage = lazy(() => import("./pages/ActivitiesPage"));
const ImpactStatisticsPage = lazy(() => import("./pages/ImpactStatisticsPage"));
const ContactInquiriesPage = lazy(() => import("./pages/ContactInquiriesPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-[#C8EBCE] border-t-[#0D3B2E]"
        role="status"
        aria-label="جاري التحميل..."
      />
    </div>
  );
}

function App() {
  const language = useLanguageStore((state) => state.language);
  const dir = useLanguageStore((state) => state.dir);

  // Sync language and direction to <html> element
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/activities/:id" element={<ActivityDetailsPage />} />
              <Route path="/research" element={<Research />} />
              <Route path="/news" element={<News />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Donate page (standalone, has its own back + language buttons) */}
            <Route path="/donate" element={<Donate />} />

            <Route path="/admin/login" element={<LoginPage />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="activities" element={<ActivitiesPage />} />
              <Route path="impact-statistics" element={<ImpactStatisticsPage />} />
              <Route path="contact-inquiries" element={<ContactInquiriesPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </Suspense>

        <Toaster richColors position="top-right" />
      </BrowserRouter>

      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
