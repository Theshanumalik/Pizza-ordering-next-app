"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

export const profileContext = createContext();

export const useProfile = () => {
  const { data, error, loading } = useContext(profileContext);
  return { data, error, loading };
};

export const ProfileProvider = ({ children }) => {
  const session = useSession();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  async function getUserProfile() {
    try {
      setLoading(true);
      const res = await axios.get("/api/profile");
      setData(res.data);
    } catch (error) {
      setData({});
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (session.status === "unauthenticated" || session.status === "loading") {
      setData({});
    }
    if (session.status === "authenticated") {
      getUserProfile();
    }
  }, [session.status]);

  return (
    <profileContext.Provider value={{ data, error, loading }}>
      {children}
    </profileContext.Provider>
  );
};
