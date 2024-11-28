import { User } from "../types/types";

// Load accounts from localStorage and validate
export const getAccounts = (): User[] => {
  const data = loadFromLocalStorage<User[]>("accounts");
  return Array.isArray(data) ? data : []; // Ensure data is an array
};

// Generic utility to load data from localStorage
export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Failed to load from localStorage (key: ${key})`, error);
    return null;
  }
};

// Generic utility to save data to localStorage
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save to localStorage (key: ${key})`, error);
  }
};

// Utility to remove data from localStorage
export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove from localStorage (key: ${key})`, error);
  }
};

// Utility to clear all localStorage data
export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Failed to clear localStorage", error);
  }
};

export const accountExists = (email: string): boolean => {
  const accounts = getAccounts();
  return accounts.some(
    (account) => account.email.toLowerCase() === email.toLowerCase()
  );
};

export const findAccountByEmail = (email: string): User | undefined => {
  const accounts = getAccounts();
  return accounts.find((acc: User) => acc.email === email);
};
