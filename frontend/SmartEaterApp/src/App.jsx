import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'

import IntroPage from './components/IntroPage/IntroPage'
import SmartEaterPage from './components/SmartEaterPage/SmartEaterPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/smart-eater" element={<SmartEaterPage />} />
      </Routes>
    </Router>
  )
}

export default App

/*

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css'

import IntroPage from './components/IntroPage/IntroPage'
import SmartEaterPage from './components/SmartEaterPage/SmartEaterPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignedOut><IntroPage /></SignedOut>} />
        <Route path="/smart-eater" element={<SignedIn><SmartEaterPage /></SignedIn>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App;

*/