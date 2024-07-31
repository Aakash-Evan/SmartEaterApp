/* eslint-disable no-unused-vars */
import styles from './MealList.module.css';

function MealList() {
    return (
        <div className={styles.container}>
            <button className={`btn btn-primary ${styles.button}`}>Generate Next Meal Options</button>
            <div className={styles.mealListContainer}>
                <ul className={styles.mealList}>
                    <li className={styles.mealListItem}>
                        <p>Meal 1</p>
                        <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </li>
                    <li className={styles.mealListItem}>
                        <p>Meal 2</p>
                        <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </li>
                    <li className={styles.mealListItem}>
                        <p>Meal 3</p>
                        <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </li>
                    <li className={styles.mealListItem}>
                        <p>Meal 4</p>
                        <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </li>
                    <li className={styles.mealListItem}>
                        <p>Meal 5</p>
                        <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </li>
                    <li className={styles.mealListItem}>
                        <p>Meal 6</p>
                        <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default MealList;
