import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";
import User from "../models/User/User";

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      addUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = (user: User) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout, loading };
};
