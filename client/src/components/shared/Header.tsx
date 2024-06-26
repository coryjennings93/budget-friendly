import { MEDIUM_SCREEN_SIZE, SITE_NAME } from "../../utils/constants";
import LogoIcon from "../icons/LogoIcon";
import LogoutButton from "./buttons/LogoutButton";
import ProfileIcon from "../icons/ProfileIcon";
import { Link } from "react-router-dom";
import { useViewport } from "@/hooks/useViewport";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { width } = useViewport();
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useAuth();

  const showNav = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex items-center justify-between p-2 pr-10 py-4 text-teal2darker bg-[url('../src/assets/img/abstract-background.jpg')]">
      <Link to="/">
        <div className="flex">
          <LogoIcon width="w-14" />
          <h1 className="pb-2 pl-4 mb-1 text-2xl sm:text-2xl md:text-4xl text-[#19985b]">
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
          <Link to="/" className="pb-2 mx-3 text-lg font-bold hover_effect">
            Home
          </Link>
          {user ? (
            <>
              <LogoutButton />
              {/* <button className="w-48 px-4 py-2 m-2 font-bold border-2 rounded-full hover:text-white hover:bg-sky-700 border-sky-800 ">
                Log Out
              </button> */}
              <ProfileIcon />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="pb-2 mx-3 text-lg font-bold hover_effect"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="pb-2 mx-3 text-lg font-bold hover_effect"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
