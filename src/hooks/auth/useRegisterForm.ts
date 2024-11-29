import { useState } from "react";
import { User } from "../../types/types";
import {
  accountExists,
  getAccounts,
  saveToLocalStorage,
} from "../../utils/storage";
import { validateEmail, validateNonEmptyFields } from "../../utils/validators";
import { useNavigate } from "react-router-dom";

//Manages the registration
export const useRegisterForm = () => {
  const [formData, setFormData] = useState<User>({
    fname: "",
    lname: "",
    email: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  return { formData, error, success, handleChange, handleSubmit };
};
