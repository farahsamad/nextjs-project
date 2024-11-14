"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisable, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const SignUpHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success: ", response.data);
      router.push("/login");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div
      id="sign-up-container"
      className="w-full min-h-screen flex flex-col items-center justify-center"
    >
      <div id="sign-up">Sign Up</div>
      <div id="error" style={{ visibility: error ? "visible" : "hidden" }}>
        {error ? error : null}
      </div>
      <div
        id="inputs-container"
        className="w-1/2 h-fit flex flex-col justify-between items-center"
      >
        <div className="p-2 flex flex-col ">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name=""
            id="username"
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
            placeholder="username"
            className="text-black py-2 px-3 rounded-md bg-gray-100 focus:outline-none focus:border-gray-500"
          />
        </div>
        <div className="p-2 flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name=""
            id="email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            placeholder="email"
            className="text-black py-2 px-3 rounded-md bg-gray-100 focus:outline-none focus:border-gray-500"
          />
        </div>
        <div className="p-2 flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name=""
            id="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            placeholder="password"
            className="text-black py-2 px-3 rounded-md bg-gray-100 focus:outline-none focus:border-gray-500"
          />
        </div>
        <button
          className="bg-none border-2 hover:scale-105 border-white w-fit mt-3 py-1 px-7 rounded-md  focus:border-gray-500"
          type="submit"
          disabled={buttonDisable ? true : false}
          onClick={SignUpHandler}
        >
          {loading ? "Processing" : "Sign Up"}
        </button>
        <Link href="/login" className="mt-2">
          Go to login
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
