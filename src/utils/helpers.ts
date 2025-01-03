import { Imagetype } from "../types/SuggestionType";

export function isCurrentPage(
  pathName: string,
  conditionString: string
): boolean {
  return pathName.endsWith(conditionString);
}

export function checkPassword(password: string): string | null {
  if (password.length < 6) return "Password must have at least 6 characters";
  if (password.length > 14) return "Password must have at most 14 characters";
  if (!/[A-Z]/.test(password))
    return "Password must have at least 1 uppercase letter";
  if (!/[a-z]/.test(password))
    return "Password must have at least 1 lowercase letter";
  if (!/\d/.test(password)) return "Password must contain at least 1 number";
  if (!/[!@#$%^&*]/.test(password))
    return "Password must contain at least 1 special character";
  return null;
}

export function generateRandomID(): string {
  return "_" + Math.random().toString(36).substring(2, 9);
}

export const isFile = (file: File | Imagetype): file is File => {
  return file instanceof File;
};
