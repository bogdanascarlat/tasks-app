/* eslint-disable react-refresh/only-export-components */
import React, { createContext } from "react";
import { AuthContextType, User } from "../types/types";
import { useNavigate } from "react-router-dom";
import useAuthState from "../hooks/useAuthState";
import useLogoutModal from "../hooks/useLogoutModal";
import ConfirmationModal from "../components/ConfirmationModal";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, setUser, loading } = useAuthState();
  const navigate = useNavigate();

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleConfirmLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const { isModalOpen, openModal, closeModal, confirmLogout } =
    useLogoutModal(handleConfirmLogout);

  const logout = () => openModal();

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={confirmLogout}
        onCancel={closeModal}
      />
    </AuthContext.Provider>
  );
};
