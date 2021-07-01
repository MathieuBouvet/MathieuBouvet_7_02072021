import AdvancedFilter, { Props as AdvancedFilterProps } from "./AdvancedFilter";
import { Recipe } from "../../data/types";
import { dedupList } from "../../utils/dedupList";

import styles from "./advancedFilter.module.css";

interface Props extends Pick<AdvancedFilterProps, "onTagClick"> {
  recipes: Recipe[];
}

function getUstensils(recipe: Recipe): string[] {
  return recipe.ustensils;
}

const UstensilFilter = ({ recipes, onTagClick }: Props) => {
  const tags = dedupList(recipes.flatMap(getUstensils));

  return (
    <AdvancedFilter
      tags={tags}
      onTagClick={onTagClick}
      label="ustensile"
      className={styles.ustensilFilter}
    />
  );
};

export default UstensilFilter;
