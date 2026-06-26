export type CartItemInput = {
  price: number;
  qty: number;
};

/**
 * Calcule le total d'un panier en centimes
 */
export function computeCartTotal(items: CartItemInput[]): number {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export type AIRecommendation = {
  clarityScore: number;
  issues: string[];
  recommendations: string[];
};

export type TransformedRecommendation = {
  score: number;
  issueCount: number;
  issues: string[];
  hasRecommendations: boolean;
};

/**
 * Transforme la réponse d'une IA en format utilisable par l'UI
 */
export function transformAIRecommendation(ai: AIRecommendation): TransformedRecommendation {
  return {
    score: ai.clarityScore,
    issueCount: ai.issues.length,
    issues: ai.issues,
    hasRecommendations: ai.recommendations.length > 0,
  };
}
