import { Outlet } from "react-router";
import Footer from "../shared/Footer";

const SiteLayoutJustFooter = () => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default SiteLayoutJustFooter;
