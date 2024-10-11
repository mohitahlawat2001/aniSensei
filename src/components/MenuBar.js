import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { toggleSearchView } from "../utils/aniSenseiSlice";
import { setLanguage } from "../utils/configSlice";
import { toggleStarred } from "../utils/starredSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faMagnifyingGlass,
  faHouse,
  faBars,
  faXmark,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { SUPPORTED_LANGUAGES } from "../utils/constants";

const MenuBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const starred = useSelector((state) => state.starred.starred);
  const searchView = useSelector((state) => state.aniSensei.searchView);
  const [open, setOpen] = useState(false);

  //handle bookmarks
  const handleStarredClick = () => {
    dispatch(toggleStarred(!starred));
    navigate("/starred");
  };

  //toggle between searching for anime, movies or navigating back to the home page
  const handleAniSenseiClick = () => {
    if (searchView === "Home") {
      dispatch(toggleSearchView("AniSensei"));
    }
    if (searchView === "AniSensei") {
      dispatch(toggleSearchView("Home"));
      navigate("/browse");
    }
    if (searchView === "Movie") {
      dispatch(toggleSearchView("AniSensei"));
    }
    if (!starred) {
      dispatch(toggleStarred(true));
    }
  };

  //   handle the sign out process
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  // handle the onchange event for the select input
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    dispatch(setLanguage(lang));
  };

  return (
    <>
      <div className="md:hidden">
        {!open ? (
          <FontAwesomeIcon
            icon={faBars}
            size="2x"
            className="text-[#74C0FC] cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faXmark}
            size="2x"
            className="text-[#74C0FC] cursor-pointer"
            onClick={() => {
              setOpen(false);
            }}
          />
        )}
        {open && (
          <ul className="absolute flex flex-col gap-5 px-7 py-3 text-lg font-semibold right-0 top-16 h-[calc(100vh-7rem)] w-[calc(100vw-5rem)] bg-gradient-to-b from-black bg-blue-600 text-white rounded-lg duration-500">
            <h2 className="font-extrabold">AniSensei</h2>
            <hr className="bg-[#74C0FC]" />
            {(searchView === "Movie" || searchView === "AniSensei") && (
              <select
                className="bg-transparent text-white   px-2   rounded-lg font-bold"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option
                    key={lang.identifer}
                    value={lang.identifer}
                    className="bg-black"
                  >
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            <li className="" onClick={handleAniSenseiClick}>
              <Link to="/browse">
                {searchView === "Home" ? (
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    size="lg"
                    className="text-[#74C0FC] mr-2"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHouse}
                    size="lg"
                    className="text-[#74C0FC] mr-2"
                  />
                )}

                {searchView === "Home" ? "Discover Anime" : "Home"}
              </Link>
            </li>
            <li className="flex items-center gap-4 font-bold text-white cursor-pointer">
              <FontAwesomeIcon
                icon={faPerson}
                size="lg"
                className="text-[#74C0FC]"
              />
              <p>Profile</p>
            </li>
            {starred && (
              <li
                onClick={handleStarredClick}
                className="flex items-center gap-3 text-white font-bold cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  size="lg"
                  className="text-[#74C0FC]"
                />
                <p>Bookmarks</p>
              </li>
            )}

            {/* sign out button */}
            <li
              onClick={() => handleSignOut()}
              className="flex items-center gap-3 text-white font-bold cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faRightFromBracket}
                size="lg"
                className="text-[#74C0FC]"
              />
              <p>Sign Out</p>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default MenuBar;