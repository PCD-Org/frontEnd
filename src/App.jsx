import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "./pages/Home";
import About from "./pages/About";
import Activities from "./pages/Activities";
import ActivityDetailsPage from "./pages/ActivityDetailsPage";
import { RootLayout } from "./components/layout/RootLayout";
import Research from "./pages/Research";
import News from "./pages/News";
import useLanguageStore from "./store/useLanguageStore";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MediaPage from "./pages/MediaPage";
import NewsPage from "./pages/NewsPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import ImpactStatisticsPage from "./pages/ImpactStatisticsPage";
import ContactInquiriesPage from "./pages/ContactInquiriesPage";
import ResearchPage from "./pages/ResearchPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

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
      
        <Routes>

          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/activities/:id" element={<ActivityDetailsPage />} />
            <Route path="/research" element={<Research />} />
            <Route path="/news" element={<News />} />
          </Route>

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
            <Route path="media" element={<MediaPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="research" element={<ResearchPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>

        <Toaster richColors position="top-right" />
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;