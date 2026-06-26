import { hashPassword, verifyPassword, isValidEmail, isValidPassword } from "../utils/authUtils";
import {
  computeCartTotal,
  transformAIRecommendation,
  type AIRecommendation,
} from "../utils/orderUtils";

describe("authUtils — hashPassword / verifyPassword", () => {
  it("should hash password when registering a user", async () => {
    // ARRANGE
    const plainPassword = "monMotDePasse123";

    // ACT
    const hash = await hashPassword(plainPassword);

    // ASSERT
    expect(hash).not.toBe(plainPassword);
    expect(hash.startsWith("$2")).toBe(true); // format bcrypt
  });

  it("should return true when password matches hash", async () => {
    // ARRANGE
    const plainPassword = "monMotDePasse123";
    const hash = await hashPassword(plainPassword);

    // ACT
    const result = await verifyPassword(plainPassword, hash);

    // ASSERT
    expect(result).toBe(true);
  });

  it("should return false when password does not match hash", async () => {
    // ARRANGE
    const plainPassword = "monMotDePasse123";
    const wrongPassword = "mauvaisMotDePasse";
    const hash = await hashPassword(plainPassword);

    // ACT
    const result = await verifyPassword(wrongPassword, hash);

    // ASSERT
    expect(result).toBe(false);
  });
});

describe("authUtils — isValidEmail", () => {
  it("should return true when email format is valid", () => {
    // ARRANGE
    const validEmail = "cyprien@summitgear.fr";

    // ACT
    const result = isValidEmail(validEmail);

    // ASSERT
    expect(result).toBe(true);
  });

  it("should return false when email format is invalid", () => {
    // ARRANGE
    const invalidEmails = ["pas-un-email", "manque@", "@domaine.fr", ""];

    // ACT & ASSERT
    invalidEmails.forEach((email) => {
      expect(isValidEmail(email)).toBe(false);
    });
  });
});

describe("authUtils — isValidPassword", () => {
  it("should return true when password has 8 or more characters", () => {
    // ARRANGE
    const validPassword = "abcdefgh";

    // ACT
    const result = isValidPassword(validPassword);

    // ASSERT
    expect(result).toBe(true);
  });

  it("should return false when password is too short", () => {
    // ARRANGE
    const shortPassword = "abc";

    // ACT
    const result = isValidPassword(shortPassword);

    // ASSERT
    expect(result).toBe(false);
  });
});

// ════════════════════════════════════════════════════════════
// T19 — Tests unitaires calcul de commande
// ════════════════════════════════════════════════════════════

describe("orderUtils — computeCartTotal", () => {
  it("should calculate correct total when cart has multiple items", () => {
    // ARRANGE
    const items = [
      { price: 489, qty: 1 },
      { price: 245, qty: 2 },
    ];

    // ACT
    const total = computeCartTotal(items);

    // ASSERT
    expect(total).toBe(979); // 489 + 245*2
  });

  it("should return 0 when cart is empty", () => {
    // ARRANGE
    const items: { price: number; qty: number }[] = [];

    // ACT
    const total = computeCartTotal(items);

    // ASSERT
    expect(total).toBe(0);
  });

  it("should handle quantity greater than 1 when computing total", () => {
    // ARRANGE
    const items = [{ price: 165, qty: 3 }];

    // ACT
    const total = computeCartTotal(items);

    // ASSERT
    expect(total).toBe(495);
  });
});

// ════════════════════════════════════════════════════════════
// T20 — Test avec IA mockée (aucun appel réseau)
// ════════════════════════════════════════════════════════════

describe("orderUtils — transformAIRecommendation (mock IA)", () => {
  it("should transform AI response when given valid mock data", () => {
    // ARRANGE — mock de la réponse IA, aucun appel réseau
    const fakeAI: AIRecommendation = {
      clarityScore: 72,
      issues: ["Taille non spécifiée", "Couleur manquante"],
      recommendations: ["Ajouter les variantes", "Préciser le grammage"],
    };

    // ACT
    const result = transformAIRecommendation(fakeAI);

    // ASSERT
    expect(result.score).toBe(72);
    expect(result.issueCount).toBe(2);
    expect(result.issues).toHaveLength(2);
    expect(result.hasRecommendations).toBe(true);
  });

  it("should return hasRecommendations false when AI has no recommendations", () => {
    // ARRANGE
    const fakeAI: AIRecommendation = {
      clarityScore: 95,
      issues: [],
      recommendations: [],
    };

    // ACT
    const result = transformAIRecommendation(fakeAI);

    // ASSERT
    expect(result.score).toBe(95);
    expect(result.issueCount).toBe(0);
    expect(result.hasRecommendations).toBe(false);
  });
});
