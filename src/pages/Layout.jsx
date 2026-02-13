import Header from "../Components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import "./pageCss/Layout.css";
// Telegram popup is handled in pages that need it

const Layout = () => {
  // Layout renders header/footer and outlet only

  return (
    <div className="Layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
