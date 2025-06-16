// src/App.js
import { Routes, Route } from 'react-router-dom';
import Main from './pages/main/index';
import './App.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;

