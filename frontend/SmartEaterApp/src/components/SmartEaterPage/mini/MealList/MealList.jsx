/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styles from './MealList.module.css';
import Axios from 'axios';

function MealList() {
    const [meals, setMeals] = useState([]);

    const getData = async () => {
        try {
            const response = await Axios.get("http://localhost:5001/getData");
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
            <button className={`btn btn-primary ${styles.button}`} onClick={getData}>Generate Next Meal Options</button>
            <div className={styles.mealListContainer}>
                <ul className={styles.mealList}>
                    {meals.map((meal, index) => (
                        <li key={index} className={styles.mealListItem}>
                            <p>{meal.name}</p>
                            <p>Description: {meal.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MealList;
