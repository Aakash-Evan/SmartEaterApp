/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styles from './MealList.module.css';
import { useCallback } from 'react';

function MealList() {
    const [meals, setMeals] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const mealsPerPage = 2;

    const getData = useCallback(async () => {
        try {
            const response = await Axios.get('http://localhost:5001/getData');
            const mealsData = response.data;
            const chunkedMeals = chunkArray(mealsData, mealsPerPage);
            setMeals(chunkedMeals);
        } catch (error) {
            console.error('There was an error fetching the data:', error);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    // Helper function to chunk an array into smaller arrays
    const chunkArray = (array, chunkSize) => {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, meals.length - 1));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Meal Planner</h1>
            <button className={`btn btn-primary ${styles.button}`} onClick={getData}>
                Generate Next Meal Options
            </button>
            <div className={styles.mealNavigation}>
                    <button
                        className={`btn btn-secondary ${styles.pageButton}`}
                        onClick={handlePrevPage}
                        disabled={currentPage === 0}
                    >
                        Previous
                    </button>
                    <button
                        className={`btn btn-secondary ${styles.pageButton}`}
                        onClick={handleNextPage}
                        disabled={currentPage >= meals.length - 1}
                    >
                        Next
                    </button>
                </div>
            <div className={styles.mealListContainer}>
                <ul className={styles.mealList}>
                    {meals[currentPage]?.map((meal, index) => (
                        <li key={index} className={styles.mealListItem}>
                            <div className={styles.mealInfo}>
                                <h3 className={styles.mealName}>{meal.name}</h3>
                                <p className={styles.mealDate}>{meal.date} at {meal.time}</p>
                                <p className={styles.mealNumItems}>Number of items: {meal.numMealItems}</p>
                            </div>
                            {meal.mealItems.map((mealItem, itemIndex) => (
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
