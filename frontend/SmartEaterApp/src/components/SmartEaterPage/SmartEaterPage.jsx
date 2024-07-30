/* eslint-disable no-unused-vars */
import styles from './SmartEaterPage.module.css';

import MealList from './mini/MealList/MealList';
import MealLogger from './mini/MealLogger/MealLogger';

function SmartEaterPage() {

    return (
        <>
            <MealLogger />
            <MealList />
        </>
    )
}

export default SmartEaterPage;