import { useRouter } from "next/router";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = () => {
    if (email === "hp502156@gmail.com" && password === "@kn520gI6YgC") {
      router.push("/home");
    }
  };
  return (
    <div>
      <div className="font-bold text-blue-600 text-xl flex justify-center pb-2">
        LOGIN YOUR ACCOUNT
      </div>
      <div className="bg-gray-100 flex items-center">
        <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
          <div className="py-12 p-10 bg-white rounded-xl">
            <div className="mb-6">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                for="name"
              >
                Email Address
              </label>
              <input
                type="email"
                className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                for="name"
              >
                Password
              </label>
              <input
                type="password"
                className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300"
              onClick={handleLogin}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
