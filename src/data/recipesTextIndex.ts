import { recipes } from "./recipes";
import { Recipe } from "./types";

export type IndexedRecipes = {
  [recipeId: number]: IndexedRecipe;
};

export type IndexedRecipe = {
  nameIndex: TextIndex;
  descriptionIndex: TextIndex;
  ingredientsIndex: TextIndex[];
};

export type TextIndex = {
  [char: string]: number[]; // each char of the string indexes position occurences
};

function buildIndex(str: string): TextIndex {
  const index: TextIndex = {};
  for (let i = 0; i < str.length; i++) {
    const char = str[i].toLowerCase();
    if (index[char] == null) {
      index[char] = [];
    }
    index[char].push(i);
  }
  return index;
}

function buildRecipeIndex(recipe: Recipe): IndexedRecipe {
  const { name, description, ingredients } = recipe;
  return {
    nameIndex: buildIndex(name),
    descriptionIndex: buildIndex(description),
    ingredientsIndex: ingredients.map(({ name }) => buildIndex(name)),
  };
}

const recipesIndex = recipes.reduce((recipesIndex, recipe) => {
  recipesIndex[recipe.id] = buildRecipeIndex(recipe);
  return recipesIndex;
}, {} as IndexedRecipes);

export { recipesIndex };
