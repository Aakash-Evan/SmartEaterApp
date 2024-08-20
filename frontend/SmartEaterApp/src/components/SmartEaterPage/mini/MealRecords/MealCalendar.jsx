import styles from './MealCalendar.module.css';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function MealCalendar() {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

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
                {daysInMonth.map((day, index) => {
                    return <div key={index}>{format(day, "d")}</div>;
                })}
            </div>
        </div>
    );
}

export default MealCalendar;
