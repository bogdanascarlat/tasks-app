import { User } from "../types/types";

export const getAccounts = (): User[] => {
    return JSON.parse(localStorage.getItem("accounts") || "[]") as User[];
  };