/* eslint-disable no-unused-vars */
import styles from './SmartEaterPage.module.css';

import Header from './mini/Header/Header';
import MealList from './mini/MealList/MealList';
import MealLogger from './mini/MealLogger/MealLogger';

function SmartEaterPage() {

    return (
        <>
            <Header />
            <MealLogger />
            <MealList />
        </>
    )
}

export default SmartEaterPage;