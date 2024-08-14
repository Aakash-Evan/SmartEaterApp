import styles from './MealRecords.module.css';
import { format } from 'date-fns';

function MealCalendar() {
    const currentDate = new Date();
    return (
        <div className={`mx-auto p-4 ${styles.container}`}>
            <div>
                <h2 className={`text-center ${styles.title}`}>{format(currentDate, "MMMM yyyy")}</h2>
            </div>
            
        </div>
    );
}

export default MealCalendar;