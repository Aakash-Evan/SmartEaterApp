import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';

import IntroPage from './components/IntroPage/IntroPage';
import SmartEaterPage from './components/SmartEaterPage/SmartEaterPage';

function App() {
  return (
    <Router>
      <div>
        <SignedIn>
          <SmartEaterPage />
        </SignedIn>
        <Routes>
          <Route
            path="/"
            element={
              <SignedOut>
                <IntroPage />
              </SignedOut>
            }
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;