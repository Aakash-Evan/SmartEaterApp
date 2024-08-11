/* eslint-disable no-unused-vars */
import { Route, Routes, Navigate } from 'react-router-dom';

import Header from './mini/Header/Header';
import MealList from './mini/MealList/MealList';
import MealLogger from './mini/MealLogger/MealLogger';
import MealRecords from './mini/MealRecords/MealRecords';

function SmartEaterPage() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/meal-logger" element={<MealLogger />} />
                <Route path="/meal-list" element={<MealList />} />
                <Route path="/meal-records" element={<MealRecords />} />
            </Routes>
        </div>
    );
}

export default SmartEaterPage;
