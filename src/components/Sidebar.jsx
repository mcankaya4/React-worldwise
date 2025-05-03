import styles from "./Sidebar.module.css";
import Logo from "./Logo.jsx";
import AppNav from "./AppNav.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      {/* Logoyu ve Appnav'ı dahil ediyoruz. */}
      <Logo />
      <AppNav />

      {/* Outlet olarak rotadan ya cities yada countries gelecek. */}
      {/* Herhangi bir extra gelmezse cities aktif olacak. */}
      <Outlet />

      {/* Footer'ı dahil ediyoruz. */}
      <Footer />
    </div>
  );
}

export default Sidebar;
