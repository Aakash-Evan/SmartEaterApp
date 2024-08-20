import styles from './MealCalendar.module.css';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function MealCalendar() {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
    const startingDayIndex = getDay(firstDayOfMonth); // to help us align the days of month because Sunday is not always the first day of the week

    return (
        <div className={styles.container}>
            <div>
                <h2 className={styles.title}>{format(currentDate, "MMMM yyyy")}</h2>
            </div>
            <div className={styles.grid}>
                {WEEKDAYS.map((day) => {
                    return <div key={day} className={styles.day}>{day}</div>;
                })}
                {/* When adding feature to change months, using inde as key won't be good */}
                {Array.from({ length: startingDayIndex }).map((_, index) => {
                    return <div key={`empty-${index}`} className={styles.days}/>;
                })}
                {daysInMonth.map((day, index) => {
                    return <div key={index} className={styles.days}>{format(day, "d")}</div>;
                })}
            </div>
        </div>
    );
}

export default MealCalendar;
