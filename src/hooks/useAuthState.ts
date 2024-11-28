import { useState, useEffect } from "react";
import { User } from "../types/types";

//Manages the authentication state (user and loading) by interfacing with localStorage
const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return { user, setUser, loading };
};

export default useAuthState;
