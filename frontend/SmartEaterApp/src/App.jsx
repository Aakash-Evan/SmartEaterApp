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
