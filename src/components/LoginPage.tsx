import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { User } from "../types/types";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [storedAccounts, setStoredAccounts] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Load accounts from localStorage on component mount
  useEffect(() => {
    const accounts = localStorage.getItem("accounts");
    if (accounts) {
      setStoredAccounts(JSON.parse(accounts));
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    // Check if the account exists
    const account = storedAccounts.find((acc) => acc.email === email);

    if (account) {
      login(account);
      navigate("/tasks");
    } else {
      setError("User not found. Please register first.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-600 mb-2">
              E-mail address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-blue-600 rounded hover:bg-blue-700 hover:scale-105 transition duration-200 focus:outline-none"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          No account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
