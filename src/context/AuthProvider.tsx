/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '../types/types';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal'; // Import the modal

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | null>(null);

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false); // State for modal
  const navigate = useNavigate();

  // Load the authentication state from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Authentication state
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Function to handle login
  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user)); // Save authentication state
  };

  // Function to handle logout
  const logout = () => {
    setIsLogoutModalOpen(true); 
  };

  // Function to confirm logout
  const handleConfirmLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove only the authentication state 
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  // Function to cancel logout
  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </AuthContext.Provider>
  );
};
