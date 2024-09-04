"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      const error =
        result.error === "CredentialsSignin"
          ? "Invalid Crendentials"
          : "Something Went Wrong";
      setError(error);
    } else {
      router.push("/search");
    }
  };

  const handleGoogleSignIn = async () => {
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setError("");
                setEmail(e.target.value);
              }}
              required
              className={`block w-full px-[2px] py-2 bg-transparent border-b ${
                error ? "border-red-500" : "border-gray-600"
              } text-gray-200 focus:outline-none ${
                error
                  ? "focus:border-red-500"
                  : "focus:border-green-500 hover:border-green-500 transition-colors"
              }`}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle between password and text
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setError("");
                setPassword(e.target.value);
              }}
              required
              className={`block w-full px-[2px] py-2 bg-transparent border-b ${
                error ? "border-red-500" : "border-gray-600"
              } text-gray-200 focus:outline-none ${
                error
                  ? "focus:border-red-500"
                  : "focus:border-green-500 hover:border-green-500 transition-colors"
              }`}
            />
            <div
              className="absolute right-4 top-3 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            {loading ? (
              <span className="animate-pulse">Signing In...</span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <div className="relative my-6 flex items-center">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="px-4 text-gray-300 bg-transparent">or</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 text-black bg-white rounded-lg hover:bg-gray-100 transition-colors"
        >
          <FcGoogle className="w-6 h-6" />
          {googleLoading ? (
            <span className="animate-pulse">Signing In...</span>
          ) : (
            "Sign in with Google"
          )}
        </button>
      </div>
    </div>
  );
}
