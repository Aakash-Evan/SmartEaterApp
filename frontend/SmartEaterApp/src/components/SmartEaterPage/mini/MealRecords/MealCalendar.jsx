import styles from './MealCalendar.module.css';
import { format } from 'date-fns';

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function MealCalendar() {
    const currentDate = new Date();
    return (
        <div className={styles.container}>
            <div>
                <h2 className={styles.title}>{format(currentDate, "MMMM yyyy")}</h2>
            </div>
            <div className={styles.grid}>
                {WEEKDAYS.map((day) => {
                    return <div key={day} className={styles.day}>{day}</div>;
                })}
            </div>
        </div>
    );
}

export default MealCalendar;
