import { useState } from 'react';
import Axios from 'axios';
import styles from './MealLogger.module.css';



function MealLogger() {
    const [mealItems, setMealItems] = useState([]);
    const [mealName, setMealName] = useState('');
    const [mealDate, setMealDate] = useState('');
    const [mealTime, setMealTime] = useState('');
    const [mealItemName, setMealItemName] = useState('');
    const [mealItemDescription, setMealItemDescription] = useState('');
    const [mealItemUnit, setMealItemUnit] = useState('');
    const [mealItemAmount, setMealItemAmount] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'mealItemName') {
            setMealItemName(value);
        } else if (name === 'mealItemDescription') {
            setMealItemDescription(value);
        } else if (name === 'mealItemUnit') {
            setMealItemUnit(value);
        } else if (name === 'mealItemAmount') {
            setMealItemAmount(value);
        } else if (name === 'mealName') {
            setMealName(value);
        } else if (name === 'mealDate') {
            setMealDate(value);
        } else if (name === 'mealTime') {
            setMealTime(value);
        }
    };

    const addMealItem = () => {
        const newMealItem = {
            name: mealItemName,
            description: mealItemDescription,
            unit: mealItemUnit,
            amount: mealItemAmount,
        };
        setMealItems([...mealItems, newMealItem]);
        // Clear input fields after adding the meal item
        setMealItemName('');
        setMealItemDescription('');
        setMealItemUnit('');
        setMealItemAmount('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const meal = {
            name: mealName,
            date: mealDate,
            time: mealTime,
            numItems: mealItems.length,
            items: mealItems,
        };
        try {
            const response = await Axios.post('http://localhost:5001/logMeal', { meal });
            console.log(response.data.message);
            setMealItems([]); // Clear the meal items after submission
            setMealName('');
            setMealDate('');
            setMealTime('');
        } catch (error) {
            console.error('There was an error logging the meal:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Meal Logger</h1>
            <form>
                <input 
                    type="text" 
                    id="mealItemName" 
                    name="mealItemName" 
                    className="form-control" 
                    placeholder="Meal Item Name" 
                    value={mealItemName}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    id="mealItemDescription" 
                    name="mealItemDescription" 
                    className="form-control" 
                    placeholder="Description" 
                    value={mealItemDescription}
                    onChange={handleChange}
                />
                <select 
                    id="mealItemUnit" 
                    name="mealItemUnit" 
                    className="form-control" 
                    value={mealItemUnit}
                    onChange={handleChange}
                >
                    <option value="">Select Unit</option>
                    <option value="oz">oz</option>
                    <option value="gram">gram</option>
                    <option value="calorie">calorie</option>
                </select>
                <input 
                    type="number" 
                    id="mealItemAmount" 
                    name="mealItemAmount" 
                    className="form-control" 
                    placeholder="Amount" 
                    value={mealItemAmount}
                    onChange={handleChange}
                />
                <button 
                    type="button" 
                    className={`btn btn-primary ${styles.button}`} 
                    onClick={addMealItem}
                >
                    Add Meal Item
                </button>
            </form>
            <ul className={styles.mealItemsList}>
                {mealItems.map((mealItem, index) => (
                    <li key={index}>
                        {mealItem.name} - {mealItem.description} - {mealItem.amount} {mealItem.unit}
                    </li>
                ))}
            </ul>
            <input 
                type="text" 
                id="mealName" 
                name="mealName" 
                className="form-control" 
                placeholder="Meal Name" 
                value={mealName} 
                onChange={handleChange}
            />
            <input 
                type="date" 
                id="mealDate" 
                name="mealDate" 
                className="form-control" 
                value={mealDate} 
                onChange={handleChange}
            />
            <input 
                type="time" 
                id="mealTime" 
                name="mealTime" 
                className="form-control" 
                value={mealTime} 
                onChange={handleChange}
            />
            <button 
                id="mealSubmit" 
                type="submit" 
                className={`btn btn-danger ${styles.button}`} 
                onClick={handleSubmit}
            >
                Log Meal
            </button>
        </div>
    );
}

export default MealLogger;
