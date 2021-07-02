import { Recipe } from "../data/types";

export default function mainSearch(
  recipes: Recipe[],
  search: string
): Recipe[] {
  return recipes.filter(recipe => {
    const searchFor = search.toLowerCase();
    return (
      recipe.name.toLowerCase().includes(searchFor) ||
      recipe.description.toLowerCase().includes(searchFor) ||
      recipe.ingredients.some(ingredient =>
        ingredient.name.toLowerCase().includes(searchFor)
      )
    );
  });
}
