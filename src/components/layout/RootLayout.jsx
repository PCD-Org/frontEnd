import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

export const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};