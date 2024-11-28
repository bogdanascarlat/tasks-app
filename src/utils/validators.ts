/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Validates an email address format.
 * @param email - The email string to validate.
 * @returns `true` if the email is valid; otherwise, `false`.
 */
export const validateEmail = (email: string): boolean => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

/**
 * Validates if all fields in an object are non-empty.
 * @param fields - An object with string fields to validate.
 * @returns `true` if all fields are non-empty; otherwise, `false`.
 */
export const validateNonEmptyFields = (data: Record<string, any>) => {
  return Object.values(data).every(
    (value) => typeof value === "string" && value.trim() !== ""
  );
};
