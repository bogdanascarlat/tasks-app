import React, { useState } from "react";
import { User } from "../types/types";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    fname: "",
    lname: "",
    email: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const validateEmail = (email: string) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validations
    if (Object.values(formData).some((field) => field.trim() === "")) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Invalid e-mail address.");
      return;
    }

    // Retrieve existing accounts from localStorage
    const storedAccounts = localStorage.getItem("accounts");
    const accounts: User[] = storedAccounts ? JSON.parse(storedAccounts) : [];

    // Check if email already exists
    const emailExists = accounts.some(
      (account) => account.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (emailExists) {
      setError("The account is already created.");
      return;
    }

    // Add new account to accounts array
    accounts.push(formData);
    localStorage.setItem("accounts", JSON.stringify(accounts));

    // Display success message
    setSuccess("Registration successful! You can now log in.");

    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate("/login");
    }, 1600);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-700">
          Register
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fname" className="block mb-1 text-sm text-gray-600">
              First Name
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              value={formData.fname}
              onChange={handleChange}
              placeholder="Type your first name"
              className="w-full px-4 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lname" className="block mb-1 text-sm text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              name="lname"
              id="lname"
              value={formData.lname}
              onChange={handleChange}
              placeholder="Type your last name"
              className="w-full px-4 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm text-gray-600">
              E-mail address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Type your e-mail address"
              className="w-full px-4 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
