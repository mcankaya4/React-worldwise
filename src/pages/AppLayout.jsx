import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar.jsx";
import Map from "../components/Map.jsx";
import User from "../components/User.jsx";

function AppLayout() {
  return (
    <div className={styles.app}>
      {/* app içerisinde solda sidebar, sağda map olacak. */}
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
