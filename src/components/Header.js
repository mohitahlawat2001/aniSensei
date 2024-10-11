import Logo from "../assets/wall3.png";
import MenuBar from "./MenuBar";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { removeUser, addUser } from "../utils/userSlice";
import { toggleSearchView } from "../utils/aniSenseiSlice";
import { setLanguage } from "../utils/configSlice";
import { toggleStarred } from "../utils/starredSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faMagnifyingGlass,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { SUPPORTED_LANGUAGES } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const starred = useSelector((state) => state.starred.starred);
  const searchView = useSelector((state) => state.aniSensei.searchView);
  const dispatch = useDispatch();

  const handleStarredClick = () => {
    dispatch(toggleStarred(!starred));
    navigate("/starred");
  };

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

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;

        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // navigate("/browse");
        // ...
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubcribe();
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    dispatch(setLanguage(lang));
  };

  return (
    <div className="fixed px-7 md:px-16 py-2 bg-gradient-to-b from-blue-600 bg-black w-screen z-10 flex justify-between items-center md:flex-row bg">
      <button
        onClick={() => {
          dispatch(toggleSearchView("Home"));
          dispatch(toggleStarred(true));
          navigate("/browse");
        }}
      >
        <img
          src={Logo}
          alt="aniSensei Logo"
          className="w-12 cursor-pointer mx-auto md:mx-0 py-2 md:py-0 "
        />
      </button>

      {user && (
        <>
          <div className="hidden p-2 mx-2 md:flex justify-between gap-8 text-lg">
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
            <button
              onClick={handleAniSenseiClick}
              className="text-white font-bold cursor-pointer hover:border-b-2 hover:border-[#74C0FC]"
            >
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
            </button>
            <div className="flex items-center gap-2 font-bold text-white cursor-pointer hover:border-b-2 hover:border-[#74C0FC]">
              <img
                src={user?.photoURL}
                alt=""
                className="hidden md:inline-block w-6 h-6 rounded-full cursor-pointer font-bold"
              />
              <p>Profile</p>
            </div>

            {starred && (
              <button
                onClick={handleStarredClick}
                className="flex items-center gap-2 text-white font-bold cursor-pointer hover:border-b-2 hover:border-[#74C0FC]"
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  size="lg"
                  className="text-[#74C0FC]"
                />
                <p>Bookmarks</p>
              </button>
            )}

            {/* sign out button */}
            <button
              onClick={() => handleSignOut()}
              className="flex items-center gap-2 text-white font-bold cursor-pointer hover:border-b-2 hover:border-[#74C0FC]"
            >
              <FontAwesomeIcon
                icon={faRightFromBracket}
                size="lg"
                className="text-[#74C0FC]"
              />
              <p>Sign Out</p>
            </button>
          </div>
          <MenuBar/>
        </>
      )}
    </div>
  );
};

export default Header;
