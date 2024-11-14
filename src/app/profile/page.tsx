"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState("nothing");
  const handelLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/token");
    console.log(response.data);
    setData(response.data.data._id);
  };

  return (
    <div
      id="log-out-container"
      className="w-full min-h-screen flex flex-col items-center justify-center"
    >
      <div>Profile</div>
      <div id="error" style={{ visibility: error ? "visible" : "hidden" }}>
        {error ? error : null}
      </div>
      <div>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </div>
      <button
        className="bg-none border-2 hover:scale-105 border-white w-fit mt-3 py-1 px-7 rounded-md  focus:border-gray-500"
        onClick={handelLogout}
      >
        {loading ? "Processing" : "LogOut"}
      </button>
      <button
        className="bg-none border-2 hover:scale-105 border-white w-fit mt-3 py-1 px-7 rounded-md  focus:border-gray-500"
        onClick={getUserDetails}
      >
        getUser Details
      </button>
    </div>
  );
}

export default ProfilePage;
