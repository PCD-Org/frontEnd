import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Activities from "./pages/Activities";
// import Research from "./pages/Research";
// import News from "./pages/News";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Fixed Header */}
        <Header />

        {/* 
          كل محتوى الموقع يبدأ بعد الـ Fixed Header
          حتى لا يغطي الهيدر بداية الصفحة
        */}
        <main className="site-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/activities" element={<Activities />} />

            {/* Uncomment when pages are ready */}
            {/* <Route path="/research" element={<Research />} /> */}
            {/* <Route path="/news" element={<News />} /> */}
          </Routes>
        </main>

          <Footer/>
          
        <Toaster
          richColors
          position="top-right"
        />
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;