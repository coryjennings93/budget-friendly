/// <reference types="vite-plugin-svgr/client" />
import { SITE_NAME } from "../utils/constants";
import { Link } from "react-router-dom";
import LogoIcon from "@/components/icons/LogoIcon";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="pb-2 mb-1 text-4xl sm:text-6xl text-slate-800 md:text-8xl gradient-text">
        {SITE_NAME}
      </h1>
      <p className="mb-3 md:text-2xl md:p-2">A friend for your wallet.</p>
      <LogoIcon />
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
  );
};

export default Home;
