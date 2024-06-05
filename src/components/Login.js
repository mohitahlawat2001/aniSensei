import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/checkValidateData";
import HomePageWallpaper from "../assets/wall4.png";
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
const Login = () => {
  const [isSignedInForm, setIsSignedInForm] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleForm = () => {
    setIsSignedInForm(!isSignedInForm);
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
    const user = userCredential.user;
    console.log(user);
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
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage+errorCode);
  });
  }
}

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={HomePageWallpaper}
          alt="background"
          className=""
        />
      </div>
      <div className="absolute w-1/3 p-12 bg-white bg-opacity-70 my-36 mx-auto right-0 left-0 rounded-lg text-black">
        <form 
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-2xl  font-bold p-2 ">
            {isSignedInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignedInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Name"
              className=" w-full h-10 bg-gray-700 bg-opacity-50 placeholder-white placeholder-opacity-40 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 my-4 mx-2 p-4"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email or phone number"
            className=" w-full h-10 bg-gray-700 bg-opacity-50 placeholder-white placeholder-opacity-50 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 my-4 mx-2 p-4"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className=" w-full h-10 bg-gray-700 bg-opacity-50 placeholder-white placeholder-opacity-50 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 my-4 mx-2 p-4"
          />
          {error && <p className="text-red-500 p-2">{error}</p>}
          <button 
          className=" w-full h-10 bg-blue-600 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50  m-2 p-2 hover:bg-blue-600 "
          onClick={handleButtonCLick}
          >
            {isSignedInForm ? "Sign In" : "Sign Up"}
          </button>
          <div className="flex items-center p-2">
            <input 
            type="checkbox" className="p-2 cursor-pointer accent-pink-300 focus:accent-red-500 "
            onChange={handleRememberMe}
             />
            <p className="p-2">Remember me</p>
          </div>
          <hr className="border-white" />

          <p className="p-2 cursor-pointer " onClick={toggleForm}>
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
