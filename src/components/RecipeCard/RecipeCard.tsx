import { FaRegClock } from "react-icons/fa";

import { Recipe } from "../../data/types";

import styles from "./recipeCard.module.css";

interface Props {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <section className={styles.recipeCard}>
      <div className={styles.recipeContent}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{recipe.name}</h2>
          <FaRegClock className={styles.clock} />
          {recipe.time}min
        </div>
        <div className={styles.details}>
          <ul>
            {recipe.ingredients
              .filter(ingredient => ingredient.quantity != null)
              .map(({ name, unit, quantity }) => (
                <li key={name}>
                  <b>{name}</b>: {quantity} {unit}
                </li>
              ))}
          </ul>
          <p className={styles.description}>{recipe.description}</p>
        </div>
      </div>
    </section>
  );
};

export default RecipeCard;
