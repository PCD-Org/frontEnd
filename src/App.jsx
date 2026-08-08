import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "./pages/Home";
import About from "./pages/About";
import Activities from "./pages/Activities";
import { RootLayout } from "./components/layout/RootLayout";
import Research from "./pages/Research";
import News from "./pages/News";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      
        <Routes>

          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/research" element={<Research />} />
            <Route path="/news" element={<News />} />
          </Route>
        </Routes>

        <Toaster richColors position="top-right" />
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;