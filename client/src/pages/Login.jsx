import React, { useState } from "react";
import { assets } from "../assets/assets.js"; //Correct format to export { inside this }
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Directs to sign up form
  const [state, setState] = useState("Sign up");

  const navigate = useNavigate();

  //state variavle for storing data
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //we use state to check that user is on sign-in or sign-up
  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-0 bg-gradient-to-br from-blue-200 to-slate-500">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-30 top-5 w-30 sm:w-34 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-5">
          {state === "Sign up" ? "Create account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-8">
          {state === "Sign up"
            ? "Create your account"
            : "Login to your account"}
        </p>

        <form>
          {state === "Sign up" && (
            <div className="mb-6 flex items-center gap-3 w-full px-7 py-2 rounded-full bg-[#333a5c]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)} //storing on change
                value={name} //name from const variable
                className="bg-transparent outline-none"
                type="text"
                placeholder="Full name"
                required
              />
            </div>
          )}

          <div className="mb-6 flex items-center gap-3 w-full px-7 py-2 rounded-full bg-[#333a5c]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)} //storing on change
              value={email} //email from const variable
              className="bg-transparent outline-none"
              type="email"
              placeholder="E-mail"
              required
            />
          </div>
          <div className="mb-6 flex items-center gap-3 w-full px-7 py-2 rounded-full bg-[#333a5c]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)} //storing on change
              value={password} //pass from const variable
              className="bg-transparent outline-none"
              type="text"
              placeholder="Password"
              required
            />
          </div>
          <p
            onClick={() => navigate("/reset-pass")}
            className="text-right mb-6 text-indigo-100 cursor-pointer "
          >
            Forgot Password?
          </p>

          <button className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-900 text-white">
            {state}
          </button>
        </form>

        {state === "Sign up" ? (
          <p className="text-white text-center text-xs mt-6">
            Already have account ?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-indigo-300 cursor-pointer underline"
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="text-white text-center text-xs mt-2">
            Don't have an account ?{" "}
            <span
              onClick={() => setState("Sign up")}
              className="text-indigo-300 cursor-pointer underline"
            >
              Create account
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
