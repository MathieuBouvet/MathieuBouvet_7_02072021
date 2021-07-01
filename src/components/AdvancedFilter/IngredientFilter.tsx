import AdvancedFilter, { Props as AdvancedFilterProps } from "./AdvancedFilter";
import { Recipe } from "../../data/types";
import { dedupList } from "../../utils/dedupList";

import styles from "./advancedFilter.module.css";

interface Props extends Pick<AdvancedFilterProps, "onTagClick"> {
  recipes: Recipe[];
}

function getIngredientsNames(recipe: Recipe): string[]{
  return recipe.ingredients.map(ingredient => ingredient.name);
};

const IngredientFilter = ({ recipes, onTagClick }: Props) => {
  const tags = dedupList(recipes.flatMap(getIngredientsNames));

  return (
    <AdvancedFilter
      tags={tags}
      onTagClick={onTagClick}
      label="ingrédient"
      className={styles.ingredientFilter}
    />
  );
};

export default IngredientFilter;
