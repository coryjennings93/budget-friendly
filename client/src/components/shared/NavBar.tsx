/// <reference types="vite-plugin-svgr/client" />
import { MEDIUM_SCREEN_SIZE, SITE_NAME } from "../../utils/constants";
import { Link } from "react-router-dom";
import LogoIcon from "@/components/icons/LogoIcon";
import { useViewport } from "@/hooks/useViewport";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const { width } = useViewport();
  const [showMenu, setShowMenu] = useState(false);

  const showNav = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex items-center justify-center p-2 lg:p-16 md:px-2 md:py-10 text-teal2darker">
      <LogoIcon width="w-14" />
      <h1 className="pb-2 pl-4 mb-1 text-2xl sm:text-2xl md:text-4xl text-[#19985b]">
        {SITE_NAME}
      </h1>

      {width < MEDIUM_SCREEN_SIZE ? (
        <div className="ml-auto">
          <div onClick={showNav}>
            {!showMenu ? (
              <div className="p-1 ">
                <FontAwesomeIcon
                  icon={faBars}
                  size="2xl"
                  className="p-3 rounded-full cursor-pointer hover:bg-gray-700 hover:bg-opacity-50"
                />
              </div>
            ) : (
              <div className="relative z-[100] p-1">
                <FontAwesomeIcon
                  icon={faXmark}
                  size="2xl"
                  className="p-3 rounded-full cursor-pointer hover:bg-gray-700 hover:bg-opacity-50"
                />
              </div>
            )}
          </div>
          {showMenu && (
            <div className="relative">
              <div className="absolute top-0 right-0 flex flex-col items-center content-center justify-center menu">
                <div className={"flex flex-col items-center justify-center "}>
                  <h1 className="pb-1 m-1text-4xl text-slate-800 md:text-7xl gradient-text">
                    {SITE_NAME}
                  </h1>
                  <p className="mb-3 md:text-2xl md:p-2">
                    Your Wallet's Best Friend!
                  </p>
                </div>
                <Link to="/">
                  <button className="w-48 px-4 py-2 m-2 font-bold border-2 rounded-full hover:text-white hover:bg-sky-700 border-sky-800 ">
                    Home
                  </button>
                </Link>
                <Link to="/login">
                  <button className="w-48 px-4 py-2 m-2 font-bold border-2 rounded-full hover:text-white hover:bg-sky-700 border-sky-800 ">
                    Log In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="w-48 px-4 py-2 m-2 font-bold border-2 rounded-full hover:text-white hover:bg-sky-700 border-sky-800 ">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 ml-auto ">
          <Link to="/login">
            {/* <button className="w-48 px-4 py-2 mt-4 font-bold text-white rounded md:mr-4 bg-amber-500 hover:bg-amber-600">
              Log In
            </button> */}
            <span className="inline-block p-4 text-2xl rounded-l-lg w-30 text-offwhite hover:underline bg-amber-500 hover:bg-amber-600">
              Log In
            </span>
          </Link>
          <Link to="/signup">
            {/* <button className="w-48 px-4 py-2 mt-4 font-bold text-white rounded md:mr-4 bg-lime-500 hover:bg-lime-700">
              Sign Up
            </button> */}
            <span className="inline-block p-4 text-2xl w-30 text-offwhite hover:underline bg-rose-500 hover:bg-rose-700">
              Sign Up
            </span>
          </Link>
          <Link to="/demo">
            {/* <button className="w-48 px-4 py-2 mt-4 font-bold text-white rounded bg-emerald-500 hover:bg-emerald-700">
              Demo
            </button> */}
            <span className="inline-block p-4 text-2xl rounded-r-lg w-30 text-offwhite hover:underline bg-emerald-500 hover:bg-emerald-700">
              Demo
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
