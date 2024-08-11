/* eslint-disable no-unused-vars */
import { Route, Routes, Navigate } from 'react-router-dom';
import styles from './SmartEaterPage.module.css';
import Header from './mini/Header/Header';
import Home from './mini/Home/Home';
import MealList from './mini/MealList/MealList';
import MealLogger from './mini/MealLogger/MealLogger';
import MealRecords from './mini/MealRecords/MealRecords';

function SmartEaterPage() {
    return (
        <div className={styles.container}>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/meal-logger" element={<MealLogger />} />
                <Route path="/meal-list" element={<MealList />} />
                <Route path="/meal-records" element={<MealRecords />} />
                <Route path="*" element={<Navigate to="/smart-eater" />} />
            </Routes>
        </div>
    );
}

export default SmartEaterPage;
