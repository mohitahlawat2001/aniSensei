import Logo from "../assets/wall3.png";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { removeUser, addUser } from "../utils/userSlice";
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        // ...

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
        // dispatch(removeUser());
    
      })
      .catch((error) => {
        // An error happened.
        // console.log(error);
        navigate("/error");
      });
  };

  return (
    <div className=" px-8 py-2 absolute bg-gradient-to-b from-black w-screen z-10 flex justify-between ">
      <Link to="/">
        <img
          src={Logo}
          alt="aniSensei Logo"
          className="w-12 cursor-pointer  "
        />
      </Link>

      {user && (
        <div className="p-2 mx-2 flex ">
          <img
            src={user?.photoURL}
            alt="User Profile"
            className="w-12 h-12 rounded-full cursor-pointer"
          />
          {/* sign out button */}
          <button
            onClick={() => handleSignOut()}
            className="bg-blue-700 text-white px-2 py-1 rounded-lg ml-2 font-bold "
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
