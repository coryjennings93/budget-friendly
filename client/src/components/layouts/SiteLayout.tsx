import { Outlet } from "react-router";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const SiteLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default SiteLayout;
