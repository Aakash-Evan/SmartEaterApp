/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styles from './MealList.module.css';
import Axios from 'axios';


function MealList() {
    /*

    TODO:
    - Decide what each meal card should display (eg. name, description, etc.)
    - Implement "show more options" button and cap it at 6 meals
    - Figure out how to get the data from the backend

    */

    const [mealName, setMealName] = useState('');

    const getData = async () => {
        const response = await Axios.get("http://localhost:5001/getData");
        setMealName(response.data);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={styles.container}>
            <button className={`btn btn-primary ${styles.button}`}>Generate Next Meal Options</button>
            <div className={styles.mealListContainer}>
                <ul className={styles.mealList}>
                    <li className={styles.mealListItem}>
                        <p>{mealName}</p>
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
