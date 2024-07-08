import Logo from "../assets/wall3.png";
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
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
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
  }

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
    if(!starred){
      dispatch(toggleStarred(true));
    }
  }

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
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // console.log("Sign-out successful.");
        dispatch(removeUser());
    
      })
      .catch((error) => {
        // An error happened.
        // console.log(error);
        navigate("/error");
      });
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    // console.log(lang);
    dispatch(setLanguage(lang));
  }
  return (
    <div className=" px-8 py-2 absolute bg-gradient-to-b from-black w-screen z-10 flex justify-between flex-col md:flex-row ">
      <button onClick={()=>{
        dispatch(toggleSearchView("Home"));
        dispatch(toggleStarred(true));
        navigate("/browse");
      }}>
        <img
          src={Logo}
          alt="aniSensei Logo"
          className="w-12 cursor-pointer mx-auto md:mx-0 py-2 md:py-0 "
        />
      </button>

      {user && (
        <div className="p-2 mx-2 flex justify-between ">
          {(searchView==='Movie'|| searchView==='AniSensei') && (
          <select className="bg-transparent text-white   px-2   rounded-lg font-bold" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifer} value={lang.identifer} className="bg-black">
                {lang.name}
              </option>
            ))}
          </select>
          )}
          <button 
            onClick={handleAniSenseiClick}
          className="bg-blue-600 text-white px-4  mx-4 rounded-lg font-bold hover:animate-pulse ">
          <Link to="/browse">
            {searchView === "Home" ? "AniSensei" : "Home"}
          </Link>
          </button>
          <img
            src={user?.photoURL}
            alt="User Profile"
            className="hidden md:inline-block w-12 h-12 rounded-full cursor-pointer "
          />
        {starred && (
            <button
              onClick={handleStarredClick}
          className="bg-blue-600 text-white px-4  mx-4 rounded-lg font-bold hover:animate-pulse ">
              Starred
            </button>
        )}
          {/* sign out button */}
          <button
            onClick={() => handleSignOut()}
            // className="bg-blue-700 text-white px-2 py-1 rounded-lg m-2 font-bold "
            className="w-12 h-12 mx-2"
          >
            <FontAwesomeIcon icon={faRightFromBracket} size="2xl" style={{color: "#74C0FC",}} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
