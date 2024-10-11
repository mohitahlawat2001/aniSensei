import { useRef, useState, useEffect } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/checkValidateData";
import HomePageWallpaper from "../assets/wall4.png";
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { addUser } from "../utils/userSlice";
import { addStarredMovies } from "../utils/starredSlice";
import { onValue,ref } from "firebase/database";
import { database } from "../utils/firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignedInForm, setIsSignedInForm] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const photoURL = useRef(null);

    const user = useSelector((state) => state.user);
    useEffect(() => {
      const dbRef = ref(database,'users/'+user?.uid);
      onValue(dbRef,(snapshot)=>{
          const data = snapshot.val();
          if(data){
              const movies = Object.values(data);
              // console.log(movies);
              movies.map((movie)=>
                (dispatch(addStarredMovies(movie)))
              );
              // setStarredMovie(movies);
          }
      });

  }, [dispatch, user]);


  const toggleForm = () => {
    setIsSignedInForm(!isSignedInForm);
  };

  const ShowPassword = (e) => {
    setShowPassword(!showPassword);
  };

  const handleButtonCLick = () => {
  //   console.log(email.current.value);
  // console.log(password.current.value);
  const msg = checkValidateData( name?.current?.value ,email.current.value, password.current.value);
  setError(msg);
  if (msg) return;

  if (!isSignedInForm) {
    // console.log("Sign In");
    createUserWithEmailAndPassword(auth, email.current.value , password.current.value)
  .then((userCredential) => {
    // Signed up
    // const user = userCredential.user;
    updateProfile(auth.currentUser, {
      displayName: name.current.value , photoURL: photoURL.current.value || "https://avatars.githubusercontent.com/u/65100859?v=4"
    }).then(() => {
      // Profile updated!
      // ...
      const { uid, email ,displayName,photoURL } = auth.currentUser;
      dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
      navigate("/browse");
    }).catch((error) => {
      // An error occurred
      // ...
      setError(error.message);
    });
    // console.log(user);
    navigate("/browse");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    setError(errorMessage+errorCode);
  });
  }
  else {
    // console.log("Sign Up");
    signInWithEmailAndPassword(auth, email.current.value , password.current.value)
  .then((userCredential) => {
    // Signed in 
    //const user = userCredential.user;
    // console.log(user);

    navigate("/browse");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // console.log(errorMessage+errorCode);
    setError(errorMessage+errorCode);
  });
  }
}

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div>
      <Header />
      <div className="fixed w-full h-full">
        <img
          src={HomePageWallpaper}
          alt="background"
          className="w-full h-screen object-cover"
        />
      </div>
      <div className=" absolute w-3/4 md:w-1/2 max-w-md p-8 bg-white bg-opacity-80 my-20 mx-auto left-0 right-0 rounded-lg text-black sm:my-24 sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-2xl font-bold p-2">
            {isSignedInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignedInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Name"
              className="w-full h-10 bg-gray-700 bg-opacity-50 placeholder-white placeholder-opacity-40 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 my-4 p-4"
            />
          )}
          {!isSignedInForm && (
            <input
              ref={photoURL}
              type="text"
              placeholder="Photo URL"
              className="w-full h-10 bg-gray-700 bg-opacity-50 placeholder-white placeholder-opacity-40 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 my-4 p-4"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email or phone number"
            className="w-full h-10 bg-gray-700 bg-opacity-50 placeholder-white placeholder-opacity-50 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 my-4 p-4"
          />
          <div className="flex items-center justify-between">
            <input
              ref={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-[95%] h-10 bg-gray-700 bg-opacity-50 placeholder-white placeholder-opacity-50 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 my-4 p-4"
            />
            <button
              className="h-6 w-6"
              type="checkbox"
              title="Show Password"
              onClick={ShowPassword}>
                  {showPassword && <FontAwesomeIcon icon={faEye} />}
                  {!showPassword && <FontAwesomeIcon icon={faEyeSlash} />}
              </button>
          </div>
          {error && <p className="text-red-500 p-2">{error}</p>}
          <button
            className="w-full h-10 bg-blue-600 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-2 hover:bg-blue-700"
            onClick={handleButtonCLick}
          >
            {isSignedInForm ? "Sign In" : "Sign Up"}
          </button>
          <div className="flex items-center p-2">
            <input
              type="checkbox"
              className="cursor-pointer accent-pink-300 focus:accent-red-500"
              onChange={handleRememberMe}
            />
            <p className="p-2">Remember me</p>
          </div>
          <hr className="border-white" />
          <p className="p-2 cursor-pointer" onClick={toggleForm}>
            {isSignedInForm
              ? "New to AniSensei? Sign up now."
              : "Already a member? Sign in now."}
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
