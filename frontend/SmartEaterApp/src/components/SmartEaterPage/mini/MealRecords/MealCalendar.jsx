import { useState, useEffect, useCallback } from 'react';
import styles from './MealCalendar.module.css';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday, addMonths, subMonths } from 'date-fns';
import { useUser } from '@clerk/clerk-react';
import Axios from 'axios';

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function MealCalendar() {
    const { user } = useUser();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [mealsByDay, setMealsByDay] = useState({});
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [mealList, setMealList] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handlePreviousMonth = () => {
        setCurrentDate(prevDate => subMonths(prevDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prevDate => addMonths(prevDate, 1));
    };

    const getData = useCallback(async () => {
        if (user) {
            try {
                const response = await Axios.get('http://localhost:5001/getData', {
                    params: { userEmail: user.primaryEmailAddress.emailAddress }
                });
                const mealsData = response.data;

                // Process mealsData to count meals per day and group them by date
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
        setSelectedDay(dayString);
        setMealList(mealsByDay[dayString] || []);
        setShowModal(true);
    };

    const handleMealClick = (meal) => {
        setSelectedMeal(meal);
        // Here you can open another modal or use the existing one to show the edit form
    };

    const handleEditMeal = async (updatedMeal) => {
        try {
            await Axios.post('http://localhost:5001/updateMeal', updatedMeal);
            // Update the mealList and mealsByDay with the edited meal
            getData(); // Refetch data after updating
            setSelectedMeal(null); // Close the edit form
        } catch (error) {
            console.error('There was an error updating the meal:', error);
        }
    };

    const handleDeleteMeal = async (mealId) => {
        try {
            await Axios.delete(`http://localhost:5001/deleteMeal/${mealId}`);
            // Update the mealList and mealsByDay after deleting
            getData(); // Refetch data after deletion
            setSelectedMeal(null); // Close the edit form if open
        } catch (error) {
            console.error('There was an error deleting the meal:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMeal(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={handlePreviousMonth} className={styles.navButton}>{"<"}</button>
                <h2 className={styles.title}>{format(currentDate, "MMMM yyyy")}</h2>
                <button onClick={handleNextMonth} className={styles.navButton}>{">"}</button>
            </div>
            <div className={styles.grid}>
                {WEEKDAYS.map((day) => (
                    <div key={day} className={styles.day}>{day}</div>
                ))}
                {Array.from({ length: startingDayIndex }).map((_, index) => (
                    <div key={`empty-${index}`} className={styles.days} />
                ))}
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
            <button className={styles.closeButton} onClick={closeModal}>X</button>
            <h3>Meals for {selectedDay}</h3>
            <ul className={styles.mealList}>
                {mealList.map((meal) => (
                    <li key={meal._id}>
                        <div onClick={() => handleMealClick(meal)}>
                            {meal.name} - {meal.time}
                            <p>Number of meal items: {meal.numMealItems}</p>
                            <ul>
                                {meal.mealItems.map((item, index) => (
                                    <li key={index}>
                                        <strong>{item.name}</strong>: {item.amount} {item.unit} - {item.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Optionally, add an "Edit" button to show the edit form */}
                        <button onClick={() => handleDeleteMeal(meal._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
)}

        </div>
    );
}

export default MealCalendar;
