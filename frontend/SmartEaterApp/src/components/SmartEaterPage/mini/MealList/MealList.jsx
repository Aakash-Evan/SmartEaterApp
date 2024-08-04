import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styles from './MealList.module.css';

function MealList() {
    const [meals, setMeals] = useState([]);

    const getData = async () => {
        try {
            const response = await Axios.get('http://localhost:5001/getData');
            setMeals(response.data); // Update state with the meals data
        } catch (error) {
            console.error('There was an error fetching the data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={styles.container}>
            <button className={`btn btn-primary ${styles.button}`} onClick={getData}>
                Generate Next Meal Options
            </button>
            <div className={styles.mealListContainer}>
                <ul className={styles.mealList}>
                    {meals.map((meal, index) => (
                        <li key={index} className={styles.mealListItem}>
                            <div>
                                <h3>{meal.name}</h3>
                                <p>{meal.date} at {meal.time}</p>
                                <p>Number of items: {meal.numItems}</p>
                            </div>
                            {meal.items.map((mealItem, itemIndex) => (
                                <div key={itemIndex} className={styles.mealItem}>
                                    <p className={styles.mealItemName}>{mealItem.name}</p>
                                    <p className={styles.mealItemDescription}>{mealItem.description}</p>
                                    <p className={styles.mealItemUnit}>{mealItem.unit}</p>
                                    <p className={styles.mealItemAmount}>{mealItem.amount}</p>
                                </div>
                            ))}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MealList;
