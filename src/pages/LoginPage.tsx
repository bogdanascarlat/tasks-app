import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";
import { validateEmail } from "../utils/validators";
import Button from "../components/Button";
import FormField from "../components/FormField";
import Alert from "../components/Alert";
import { findAccountByEmail } from "../utils/storage";
import AppHeader from "../components/AppHeader";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    const account = findAccountByEmail(email);

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
        <AppHeader />
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <FormField
            id="email"
            name="email"
            value={email}
            label="E-mail address"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <Alert type="error" message={error} />}
          <Button type="submit" variant="primary">
            Login
          </Button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
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
