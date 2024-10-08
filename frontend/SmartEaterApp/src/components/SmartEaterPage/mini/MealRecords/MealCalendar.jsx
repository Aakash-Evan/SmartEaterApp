import { useState, useEffect, useCallback } from 'react';
import styles from './MealCalendar.module.css';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday, addMonths, subMonths } from 'date-fns';
import { useUser } from '@clerk/clerk-react';
import Axios from 'axios';

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// TODO: Add a "go to current month button" that takes you to the current month
// TODO: Have time be displayed with am and pm instead of military time
// TODO: Style how the meal information is displayed
// TODO: If overflow happens, have scrolling like it is in the meal logger
// TODO: Style the form when the edit button is clicked to make it look nice

function MealCalendar() {
    const { user } = useUser();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [mealsByDay, setMealsByDay] = useState({});
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [mealList, setMealList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [mealForm, setMealForm] = useState({
        name: '',
        time: '',
        mealItems: [{ name: '', description: '', unit: '', amount: 0 }],
    });

    const handlePreviousMonth = () => {
        setCurrentDate(prevDate => subMonths(prevDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prevDate => addMonths(prevDate, 1));
    };

    // Gets the data from the database
    const getData = useCallback(async () => {
        if (user) {
            try {
                const response = await Axios.get('http://localhost:5001/getData', {
                    params: { userEmail: user.primaryEmailAddress.emailAddress }
                });
                const mealsData = response.data;

                const mealsCount = mealsData.reduce((acc, meal) => {
                    const date = meal.date;
                    acc[date] = acc[date] || [];
                    acc[date].push(meal);
                    return acc;
                }, {});

                setMealsByDay(mealsCount);
            } catch (error) {
                console.error('There was an error fetching the data:', error);
            }
        }
    }, [user]);

    useEffect(() => {
        getData();
    }, [getData]);

    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
    const startingDayIndex = getDay(firstDayOfMonth);

    const handleDayClick = (day) => {
        const dayString = format(day, "yyyy-MM-dd");
        const mealsForDay = mealsByDay[dayString] || [];
    
        // Sort meals by time
        const sortedMeals = mealsForDay.sort((a, b) => {
            const timeA = new Date(`1970-01-01T${a.time}`);
            const timeB = new Date(`1970-01-01T${b.time}`);
            return timeA - timeB;
        });
    
        setSelectedDay(dayString);
        setMealList(sortedMeals);
        setShowModal(true);
    };
    

    const handleMealClick = (meal) => {
        setSelectedMeal(meal);
        setMealForm({
            name: meal.name,
            time: meal.time,
            date: meal.date,
            mealItems: meal.mealItems,
        });
        setIsEditing(true);
    };

    const handleEditMeal = async () => {
        try {
            const updatedMeal = {
                ...selectedMeal,
                name: mealForm.name,
                time: mealForm.time,
                mealItems: mealForm.mealItems,
            };
            await Axios.post('http://localhost:5001/updateMeal', updatedMeal);
            getData();
            setIsEditing(false);
            setSelectedMeal(null);
        } catch (error) {
            console.error('There was an error updating the meal:', error);
        }
    };

    const handleDeleteMeal = async (mealId) => {
        try {
            await Axios.delete(`http://localhost:5001/deleteMeal/${mealId}`);
            getData();
            setSelectedMeal(null);
        } catch (error) {
            console.error('There was an error deleting the meal:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMeal(null);
        setIsEditing(false);
    };

    const handleFormChange = (index, event) => {
        const { name, value } = event.target;
        const updatedMealItems = [...mealForm.mealItems];
        updatedMealItems[index][name] = value;
        setMealForm({ ...mealForm, mealItems: updatedMealItems });
    };    

    const addItem = () => {
        setMealForm({
            ...mealForm,
            mealItems: [...mealForm.mealItems, { name: '', description: '', unit: '', amount: 0 }]
        });
    };

    const removeItem = (index) => {
        const updatedMealItems = [...mealForm.mealItems];
        updatedMealItems.splice(index, 1);
        setMealForm({ ...mealForm, mealItems: updatedMealItems });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Meal Records</h1>
            <div className={styles.header}>
                <button onClick={handlePreviousMonth} className={styles.navButton}>{"<"}</button>
                <h2 className={styles.date}>{format(currentDate, "MMM yyyy")}</h2>
                <button onClick={handleNextMonth} className={styles.navButton}>{">"}</button>
            </div>
            <div className={styles.grid}>
                {WEEKDAYS.map((day) => (
                    <div key={day} className={styles.day}>{day}</div>
                ))}
                {/* Add empty days if needed */}
                {Array.from({ length: startingDayIndex }).map((_, index) => (
                    <div key={`empty-${index}`} className={styles.days} />
                ))}
                {/* Render the actual days of the month */}
                {daysInMonth.map((day, index) => {
                    const dayString = format(day, "yyyy-MM-dd");
                    const mealsCount = (mealsByDay[dayString] || []).length;
                    const dayClasses = `${styles.days} ${isToday(day) ? styles.today : ''}`;
                    return (
                        <div
                            key={index}
                            className={dayClasses}
                            onClick={() => handleDayClick(day)}
                        >
                            {format(day, "d")}
                            {mealsCount > 0 && <span className={styles.mealCount}> ({mealsCount})</span>}
                        </div>
                    );
                })}
            </div>

            {showModal && (
    <div className={styles.modal}>
        <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
                <h3>{isEditing ? `Edit Meal for ${selectedDay}` : `Meals for ${selectedDay}`}</h3>
                <button className={styles.closeButton} onClick={closeModal}>X</button>
            </div>
            {isEditing ? (
                <div>
                    <form>
                        <div>
                            <label>Meal Name:</label>
                            <input
                                type="text"
                                value={mealForm.name}
                                onChange={(e) => setMealForm({ ...mealForm, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Meal Date:</label>
                            <input 
                                type="date"
                                className="form-control"
                                value={mealForm.date}
                                onChange={(e) => setMealForm({ ...mealForm, date: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Meal Time:</label>
                            <input
                                type="time"
                                className="form-control"
                                value={mealForm.time}
                                onChange={(e) => setMealForm({ ...mealForm, time: e.target.value })}
                            />
                        </div>
                        {mealForm.mealItems.map((item, index) => (
                            <div key={index} className={styles.mealItem}>
                                <label>Item Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={item.name}
                                    onChange={(e) => handleFormChange(index, e)}
                                />
                                <label>Amount:</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={item.amount}
                                    onChange={(e) => handleFormChange(index, e)}
                                />
                                <label>Unit:</label>
                                <select 
                                    name="unit"
                                    value={item.unit}
                                    onChange={(e) => handleFormChange(index, e)}
                                >
                                    <option value="">Select Unit</option>
                                    <option value="oz">oz</option>
                                    <option value="grams">grams</option>
                                    <option value="calories">calories</option>
                                </select>
                                <label>Description:</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={item.description}
                                    onChange={(e) => handleFormChange(index, e)}
                                />
                                <button type="button" onClick={() => removeItem(index)}>Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={addItem}>Add Item</button>
                    </form>
                    <button onClick={handleEditMeal}>Save</button>
                </div>
            ) : (
                <div>
                    <ul className={styles.mealList}>
                        {mealList.length === 0 && <li className={styles.mealListItem}>No meals recorded yet...</li>}
                        {mealList.map((meal) => (
                            <li key={meal._id} className={styles.mealListItem}>
                                <div className={styles.mealDetails}>
                                    <p className={styles.mealNameAndTime}>{meal.name} - {meal.time}</p>
                                    <p>Number of meal items: {meal.numMealItems}</p>
                                    <ul className={styles.mealItemsList}>
                                        {meal.mealItems.map((item, index) => (
                                            <li key={index}>
                                                <strong>{item.name}</strong>: {item.amount} {item.unit} - {item.description}
                                            </li>
                                        ))}
                                    </ul>
                                    <button onClick={() => handleMealClick(meal)} className={styles.editMealBtn}>Edit</button>
                                    <button onClick={() => handleDeleteMeal(meal._id)} className={styles.deleteMealBtn}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>
)}
        </div>
    );
}

export default MealCalendar;
