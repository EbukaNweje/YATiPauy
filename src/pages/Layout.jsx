import Header from "../Components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import "./pageCss/Layout.css";

const Layout = () => {
  return (
    <div className="Layout">
      {/* Top header bar */}
      <div className="layout-header">
        <Header />
      </div>

      {/* Page body: sidebar + main content */}
      <div className="layout-body">
        {/* Left sidebar (desktop) / bottom tab bar (mobile) */}
        <aside className="layout-sidebar">
          <Footer />
        </aside>

        {/* Main scrollable content area */}
        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
