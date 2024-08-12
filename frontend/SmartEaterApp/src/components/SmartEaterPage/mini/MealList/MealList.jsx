/* eslint-disable no-unused-vars */
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
                        <div className={styles.mealInfo}>
                            <h3 className={styles.mealName}>{meal.name}</h3>
                            <p className={styles.mealDate}>{meal.date} at {meal.time}</p>
                            <p className={styles.mealNumItems}>Number of items: {meal.numMealItems}</p> {/* Updated key */}
                        </div>
                        {meal.mealItems.map((mealItem, itemIndex) => ( // Updated key
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
