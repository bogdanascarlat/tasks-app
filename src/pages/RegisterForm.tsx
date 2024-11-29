import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../types/types";
import {
  accountExists,
  getAccounts,
  saveToLocalStorage,
} from "../utils/storage";
import { validateEmail, validateNonEmptyFields } from "../utils/validators";
import Button from "../components/Button";
import FormField from "../components/FormField";
import Alert from "../components/Alert";
import AppHeader from "../components/AppHeader";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validations
    if (!validateNonEmptyFields(formData)) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Invalid e-mail address.");
      return;
    }

    if (accountExists(formData.email)) {
      setError("The account is already created.");
      return;
    }

    // Add new account
    const accounts = getAccounts();
    saveToLocalStorage("accounts", [...accounts, formData]);

    setSuccess("Registration successful! You can now log in.");
    setTimeout(() => navigate("/login"), 1600);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <AppHeader />
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-700">
          Register
        </h2>
        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}
        <form onSubmit={handleSubmit}>
          <FormField
            id="fname"
            name="fname"
            value={formData.fname}
            label="First Name"
            placeholder="Type your first name"
            onChange={handleChange}
          />
          <FormField
            id="lname"
            name="lname"
            value={formData.lname}
            label="Last Name"
            placeholder="Type your last name"
            onChange={handleChange}
          />
          <FormField
            id="email"
            name="email"
            value={formData.email}
            label="E-mail address"
            placeholder="Type your e-mail address"
            type="email"
            onChange={handleChange}
          />
          <Button type="submit" variant="primary">
            Register
          </Button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Do you have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
