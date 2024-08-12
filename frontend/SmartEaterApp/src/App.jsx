import { useAuth } from "@clerk/clerk-react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';

import IntroPage from './components/IntroPage/IntroPage';
import SmartEaterPage from './components/SmartEaterPage/SmartEaterPage';

function App() {
  const { isSignedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isSignedIn ? <Navigate to="/smart-eater" /> : <IntroPage />
          }
        />
        <Route
          path="/smart-eater/*"
          element={
            isSignedIn ? <SmartEaterPage /> : <Navigate to="/" />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
