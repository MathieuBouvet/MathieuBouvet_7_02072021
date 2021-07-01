import { FaSearch } from "react-icons/fa";
import styles from "./mainSearchBox.module.css";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

const MainSearchBox = ({ value = "", onChange = () => {} }: Props) => {
  return (
    <div className={styles.mainSearchBox}>
      <input
        className={styles.searchInput}
        type="search"
        placeholder="Rechercher un ingrédient, appareil, ustensiles ou une recette"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <FaSearch className={styles.searchIcon} />
    </div>
  );
};

export default MainSearchBox;
