/* eslint-disable no-unused-vars */
import styles from './SmartEaterPage.module.css';

import Header from './mini/Header/Header';
import MealList from './mini/MealList/MealList';
import MealLogger from './mini/MealLogger/MealLogger';
import MealRecords from './mini/MealRecords/MealRecords';

function SmartEaterPage() {

    return (
        <>
            <Header />
            <MealLogger />
            <MealRecords />
            <MealList />
        </>
    )
}

export default SmartEaterPage;