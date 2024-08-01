import { useState } from 'react';
import styles from './MealLogger.module.css';

function MealLogger() {
    const [mealName, setMealName] = useState('');

    const handleChange = (event) => {
        setMealName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Meal logged:', mealName);
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
