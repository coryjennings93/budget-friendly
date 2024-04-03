import { SITE_NAME } from "@/utils/constants";
import { Link } from "react-router-dom";
import LogoIcon from "../icons/LogoIcon";

const Footer = () => {
  return (
    <footer className=" text-offwhite bg-[#30718d] ">
      <div className="max-w-6xl m-auto">
        <div className="flex flex-col justify-center px-5 py-8 sm:flex-row">
          <div className="flex flex-col items-center sm:mx-5 lg:mx-8">
            <h4 className="text-[#efe5ca]">Company</h4>
            <Link to="/" className="p-1 text-lg hover:text-[#e1d6c0]">
              Home
            </Link>
            <Link to="" className="p-1 text-lg hover:text-[#e1d6c0]">
              About
            </Link>
            <Link to="" className="p-1 text-lg hover:text-[#e1d6c0]">
              Pricing
            </Link>
            <Link to="" className="p-1 text-lg hover:text-[#e1d6c0]">
              Blog
            </Link>
          </div>
          <div className="flex flex-col items-center py-6 mx-5 lg:mx-8 sm:py-0">
            <h4 className="text-[#efe5ca]">Resources</h4>
            <Link to="" className="p-1 text-lg hover:text-[#e1d6c0]">
              Careers
            </Link>
            <Link to="" className="p-1 text-lg hover:text-[#e1d6c0]">
              Contact
            </Link>
            <Link to="/credit" className="p-1 text-lg hover:text-[#e1d6c0]">
              Image Credit
            </Link>
          </div>
          <div className="sm:ml-auto">
            <div className="flex flex-col items-center justify-center gap-2">
              <LogoIcon width="w-14" />
              <h1 className="text-4xl text-[#93d1cc] text-center">
                {SITE_NAME}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-4 border-t-2 border-offwhite">
          <Link to="" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="" className="hover:underline">
            Terms of Service
          </Link>
          <p>© 2024 Budget Tracker</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
