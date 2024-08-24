import { useState, useEffect, useCallback } from 'react';
import styles from './MealCalendar.module.css';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday, addMonths, subMonths } from 'date-fns';
import { useUser } from '@clerk/clerk-react';
import Axios from 'axios';

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


// TODO: When a day is clicked, show the meal list for that day
// TODO: When a meal is clicked, show the edit meal form
// TODO: Add edit meal item button and functionality
// TODO: Add delete meal item button and functionality

function MealCalendar() {
    const { user } = useUser();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [mealsByDay, setMealsByDay] = useState({});

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

                // Process mealsData to count meals per day
                const mealsCount = mealsData.reduce((acc, meal) => {
                    const date = meal.date;
                    acc[date] = (acc[date] || 0) + 1;
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
                    const mealsCount = mealsByDay[dayString] || 0;
                    const dayClasses = `${styles.days} ${isToday(day) ? styles.today : ''}`;
                    return (
                        <div key={index} className={dayClasses}>
                            {format(day, "d")}
                            {mealsCount > 0 && <span className={styles.mealCount}> ({mealsCount})</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MealCalendar;
