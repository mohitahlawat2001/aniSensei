import { useState } from "react";
import Header from "./Header";
const Login = () => {
  const [isSignedInForm, setIsSignedInForm] = useState(true);
  const toggleForm = () => {
    setIsSignedInForm(!isSignedInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dd4dfce3-1a39-4b1a-8e19-b7242da17e68/86742114-c001-4800-a127-c9c89ca7bbe4/IN-en-20240527-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
          className=""
        />
      </div>
      <div className="absolute w-1/3 p-12 bg-black bg-opacity-80 my-36 mx-auto right-0 left-0 rounded-lg text-white">
        <form className="flex flex-col">
          <h1 className="text-2xl  font-bold p-2 ">
            {isSignedInForm ? "Sign In" : "Sign Up"}
        </h1>
            {
                !isSignedInForm && (
                    <input
                    type="text"
                    placeholder="Name"
                    className=" w-full h-10 bg-gray-700 bg-opacity-50 placeholder-white placeholder-opacity-50 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 my-4 mx-2 p-4"
                    />
                )

            }
          <input
            type="text"
            placeholder="Email or phone number"
            className=" w-full h-10 bg-gray-700 bg-opacity-50 placeholder-white placeholder-opacity-50 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 my-4 mx-2 p-4"
          />
          <input
            type="password"
            placeholder="Password"
            className=" w-full h-10 bg-gray-700 bg-opacity-50 placeholder-white placeholder-opacity-50 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 my-4 mx-2 p-4"
          />
          <button className=" w-full h-10 bg-red-500 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50  m-2 p-2 hover:bg-red-600 ">
            {isSignedInForm ? "Sign In" : "Sign Up"}
          </button>
          <p  className='p-2 cursor-pointer ' onClick={toggleForm} >
            {isSignedInForm
              ? "New to Netflix? Sign up now."
              : "Already a member? Sign in now."}
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
