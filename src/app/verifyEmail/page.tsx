"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      console.log("response is: ", response);
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div
      id="verify-email-container"
      className="w-full min-h-screen flex flex-col items-center justify-center"
    >
      <div>Verify Email</div>
      <div id="error" style={{ visibility: error ? "visible" : "hidden" }}>
        {error ? (
          <div className="bg-red-500 mt-2 p-2">Error : {error}</div>
        ) : null}
      </div>
      <div className="bg-purple-800 p-2 mt-2">{token ? token : "no token"}</div>
      <div>
        {verified && (
          <div className="mt-2">
            <h2>Email Verified</h2>
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailPage;
