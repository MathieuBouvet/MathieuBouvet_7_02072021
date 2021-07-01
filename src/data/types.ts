export type Recipe = {
  id: number;
  name: string;
  servings: number;
  ingredients: Ingredient[];
  time: number;
  description: string;
  appliance: string;
  ustensils: string[];
};

export type Ingredient = {
  ingredient: string;
  quantity?: number;
  unit?: string;
};
