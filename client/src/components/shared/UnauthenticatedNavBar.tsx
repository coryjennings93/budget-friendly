import { Link } from "react-router-dom";
import { useViewport } from "../../hooks/useViewport";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { MEDIUM_SCREEN_SIZE, SITE_NAME } from "@/utils/constants";
import { Button } from "@/components/ui/button";

const UnauthenticatedNavBar = () => {
  const { width } = useViewport();
  const [showMenu, setShowMenu] = useState(false);

  const showNav = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      {width < MEDIUM_SCREEN_SIZE ? (
        <>
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
              <div className="fixed z-10 p-1">
                <FontAwesomeIcon
                  icon={faXmark}
                  size="2xl"
                  className="p-3 rounded-full cursor-pointer hover:bg-gray-700 hover:bg-opacity-50"
                />
              </div>
            )}
          </div>
          {showMenu && (
            <>
              <div className="flex flex-col items-center content-center justify-center menu">
                <div className={"flex flex-col items-center justify-center "}>
                  <h1 className="pb-1 m-1text-4xl text-slate-800 md:text-7xl gradient-text">
                    {SITE_NAME}
                  </h1>
                  <p className="mb-3 md:text-2xl md:p-2">
                    A friend for your wallet.
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
            </>
          )}
        </>
      ) : (
        <div className="flex justify-center">
          <Link to="/">
            <button className="w-48 px-4 py-2 m-4 font-bold border-2 rounded-full hover:text-white hover:bg-sky-700 border-sky-800 ">
              Home
            </button>
          </Link>
          <Link to="/login">
            <button className="w-48 px-4 py-2 m-4 font-bold border-2 rounded-full hover:text-white hover:bg-sky-700 border-sky-800 ">
              Log In
            </button>
          </Link>
          <Link to="/signup">
            <button className="w-48 px-4 py-2 m-4 font-bold border-2 rounded-full hover:text-white hover:bg-sky-700 border-sky-800 ">
              Create Account
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default UnauthenticatedNavBar;
