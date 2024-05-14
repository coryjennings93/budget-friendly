import { Link } from "react-router-dom";
import { useViewport } from "../../hooks/useViewport";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { MEDIUM_SCREEN_SIZE, SITE_NAME } from "@/utils/constants";
import LogoIcon from "../icons/LogoIcon";
import { useAuth } from "@/context/AuthContext";
import LogoutButton from "../shared/buttons/LogoutButton";
import ProfileIcon from "../icons/ProfileIcon";

const DashboardHeader = ({
  getHeight,
}: {
  getHeight: (height: number) => void;
}) => {
  const { width } = useViewport();
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useAuth();

  // this is for getting the height of the navbar
  // I want to get the height to pass to the dashboard so that the dashboard can adjust its height
  const headerRef = useRef(null);

  useEffect(() => {
    const headerHeight = headerRef.current.offsetHeight;
    getHeight(headerHeight);
  }, [getHeight]);

  const showNav = () => {
    setShowMenu(!showMenu);
  };

  //[url('../src/assets/img/abstract-background.jpg')]
  // gradient-to-r from-sky-700 to-sky-800 shadow-md
  // rgb(187 166 104)
  // hsl(176.33deg 25.84% 53.15%)
  // rgb(15 57 53)

  return (
    <div
      className="flex items-center justify-between p-2 pr-10 text-teal-900 "
      ref={headerRef}
    >
      <Link to="/">
        <div className="flex">
          <LogoIcon width="w-14" />
          <h1 className="pt-1 pl-4 mb-1 text-2xl sm:text-2xl md:text-4xl ">
            {SITE_NAME}
          </h1>
        </div>
      </Link>
      {width < MEDIUM_SCREEN_SIZE ? (
        <div>
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
        </div>
      ) : (
        <div className="">
          {user ? (
            <ProfileIcon />
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/login">Log In</Link>
              <Link to="/signup">Create Account</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
