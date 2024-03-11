/// <reference types="vite-plugin-svgr/client" />
import { SITE_NAME } from "../../utils/constants";
import { Link } from "react-router-dom";
import LogoIcon from "@/components/icons/LogoIcon";

const NavBar = () => {
  return (
    <div className="flex items-center justify-center p-16">
      <LogoIcon width="w-14" />
      <h1 className="pb-2 pl-4 mb-1 text-2xl sm:text-6xl text-slate-800 md:text-4xl ">
        {SITE_NAME}
      </h1>
      <div className="ml-auto">
        <Link to="/login">
          <button className="w-48 px-4 py-2 mt-4 font-bold text-white rounded bg-amber-500 hover:bg-amber-600">
            Log In
          </button>
        </Link>
        <Link to="/signup">
          <button className="w-48 px-4 py-2 mt-4 font-bold text-white rounded bg-lime-500 hover:bg-lime-700">
            Sign Up
          </button>
        </Link>
        <Link to="/demo">
          <button className="w-48 px-4 py-2 mt-4 font-bold text-white rounded bg-emerald-500 hover:bg-emerald-700">
            Demo
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
