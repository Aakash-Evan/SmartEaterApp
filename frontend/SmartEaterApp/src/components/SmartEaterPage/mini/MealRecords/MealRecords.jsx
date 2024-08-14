import styles from './MealRecords.module.css';
import Axios from 'axios';
import { addDays, subDays } from 'date-fns';
import MealCalendar from './MealCalendar';

function MealRecords() {
    return (
        <div>
            <MealCalendar 
                events={[
                    { date: subDays(new Date(), 6), title: "Post video" },
                    { date: subDays(new Date(), 1), title: "Edit video" },
                    { date: addDays(new Date(), 3), title: "Code" },
                ]}
            />    
        </div>
        
    );
}

export default MealRecords;