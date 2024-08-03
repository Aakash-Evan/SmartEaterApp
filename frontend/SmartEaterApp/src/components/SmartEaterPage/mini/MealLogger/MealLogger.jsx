import { useState } from 'react';
import Axios from 'axios';
import styles from './MealLogger.module.css';

function MealLogger() {
    const [mealName, setMealName] = useState('');

    const handleChange = (event) => {
        setMealName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await Axios.post('http://localhost:5001/logMeal', { mealName });
            console.log(response.data.message);
        } catch (error) {
            console.error('There was an error logging the meal:', error);
        }
        setMealName('');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Meal Logger</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="mealName"
                    name="mealName"
                    placeholder="Enter meal name"
                    className="form-control"
                    value={mealName}
                    onChange={handleChange}
                    required
                />
                <button id="mealSubmit" type="submit" className={`btn btn-primary ${styles.button}`}>Log Meal</button>
            </form>
        </div>
    );
}

export default MealLogger;
