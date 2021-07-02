import { useState } from "react";
import cx from "classnames";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

import { useClickOutside } from "../../hooks/useClickOutside";

import styles from "./advancedFilter.module.css";

export interface Props {
  tags: string[];
  className?: string;
  label: string;
  onTagClick?: (tag: string) => void;
  selectedTags?: string[];
}

const AdvancedFilter = ({
  tags,
  className = "",
  label,
  onTagClick = () => {},
  selectedTags = [],
}: Props) => {
  const [isFolded, setFolded] = useState(true);
  const [searchTag, setSearchTag] = useState("");

  const filteredTags = tags.filter(tag =>
    tag.toLowerCase().includes(searchTag.toLowerCase())
  );

  const ref = useClickOutside(() => {
    if (!isFolded) setFolded(true);
  });

  return (
    <div
      className={cx(styles.advancedFilter, className, {
        [styles.unfolded]: !isFolded,
      })}
      ref={ref}
    >
      {isFolded ? (
        <button
          onClick={() => setFolded(false)}
          className={styles.unfoldButton}
        >
          {label}
          <FaChevronDown className={styles.unfoldIcon} />
        </button>
      ) : (
        <>
          <div className={styles.searchContainer}>
            <input
              type="search"
              placeholder={`Rechercher un ${label}`}
              className={styles.search}
              value={searchTag}
              onChange={e => setSearchTag(e.target.value)}
            />
            <button
              onClick={() => setFolded(true)}
              className={styles.foldButton}
            >
              <FaChevronUp />
            </button>
          </div>
          <div className={styles.tagContainer}>
            {filteredTags.map(tag => (
              <button
                onClick={() => onTagClick(tag)}
                className={styles.tagButton}
                key={`${label}-${tag}`}
                disabled={selectedTags.includes(tag)}
              >
                {tag}
              </button>
            ))}
            {filteredTags.length === 0 && (
              <p className={styles.noResults}>Pas de résultats</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdvancedFilter;
