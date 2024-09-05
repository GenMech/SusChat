"use client";

import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const storedUUID = localStorage.getItem("session_uuid");

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        stored_session_uuid: storedUUID,
      }),
    });

    setLoading(false);

    if (response.ok) {
      localStorage.removeItem("session_uuid");
      router.push("/auth/signin");
    } else {
      const data = await response.json();
      setError(data.message || "An error occurred");
    }
  };

  const handleGoogleSignIn = async () => {
    const storedUUID = localStorage.getItem("session_uuid") || uuidv4();
    document.cookie = `session_uuid=${storedUUID}; path=/;`;
    localStorage.removeItem("session_uuid");
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/search" });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 space-y-7 bg-[#31313140] backdrop-blur-[3.4px] border border-[#46BA3C] rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">
          Welcome to Voyex
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={loading || googleLoading}
              className="block w-full px-[2px] py-2 bg-transparent border-b border-gray-600 text-gray-200 focus:outline-none focus:border-green-500 hover:border-green-500 transition-colors"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={loading || googleLoading}
              className="block w-full px-[2px] py-2 bg-transparent border-b border-gray-600 text-gray-200 focus:outline-none focus:border-green-500 hover:border-green-500 transition-colors"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading || googleLoading}
              className="block w-full px-[2px] py-2 bg-transparent border-b border-gray-600 text-gray-200 focus:outline-none focus:border-green-500 hover:border-green-500 transition-colors"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading || googleLoading}
              className="block w-full px-[2px] py-2 bg-transparent border-b border-gray-600 text-gray-200 focus:outline-none focus:border-green-500 hover:border-green-500 transition-colors"
            />
            <div
              className="absolute right-4 top-3 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
            </div>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 mt-6 font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            {loading ? (
              <span className="animate-pulse">Signing Up...</span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="relative my-6 flex items-center">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="px-3 text-gray-300 bg-transparent">or</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 text-black bg-white rounded-lg hover:bg-gray-100 transition-colors"
        >
          <FcGoogle className="w-6 h-6" />
          {googleLoading ? (
            <span className="animate-pulse">Signing Up...</span>
          ) : (
            "Sign up with Google"
          )}
        </button>
        <div className="flex justify-center mt-2">
          <span className="text-gray-400">
            Already have an account?
            <a href="/auth/signin" className="text-green-600 font-semibold">
              {" "}
              Sign In
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
