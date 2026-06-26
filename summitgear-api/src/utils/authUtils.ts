import bcrypt from "bcryptjs";

/**
 * Hash un mot de passe en clair
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * Compare un mot de passe en clair avec un hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Valide le format d'un email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valide la longueur minimale d'un mot de passe
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}
