// src/App.js
import { Routes, Route } from 'react-router-dom';
import Main from './pages/main/index';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DailyMirrorNews from './pages/dailymirror';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/news/dailymirrorlk" element={<DailyMirrorNews />} />
      </Routes>
      <ToastContainer /> 
    </>
  );
}

export default App;


