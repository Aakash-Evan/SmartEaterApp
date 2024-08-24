import { useState } from 'react';
import styles from './MealCalendar.module.css';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday, addMonths, subMonths } from 'date-fns';

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function MealCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handlePreviousMonth = () => {
        setCurrentDate(prevDate => subMonths(prevDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prevDate => addMonths(prevDate, 1));
    };

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
                    const dayClasses = `${styles.days} ${isToday(day) ? styles.today : ''}`;
                    return <div key={index} className={dayClasses}>{format(day, "d")}</div>;
                })}
            </div>
        </div>
    );
}

export default MealCalendar;
