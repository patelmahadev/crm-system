import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Layout.scss";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  const pathsWithoutLayout = ["/", "/signup" ,"*"];

  const isLayoutDisabled = pathsWithoutLayout.includes(location.pathname);
  if (isLayoutDisabled) {
    return <>{children}</>;
  }
  return (
    <div className="layout-wrapper">
      <Sidebar />
      <div className="app-wrapper">
        <Header />
        <div className="app-body">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
