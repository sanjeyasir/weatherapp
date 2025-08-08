// src/App.js
import { Routes, Route } from 'react-router-dom';
import Main from './pages/main/index';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DailyMirrorNews from './pages/dailymirror';
import Game from './pages/game';
import SnakeGame from './pages/snakegame';
import SolarSystem from './pages/solarsystem';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/news/dailymirrorlk" element={<DailyMirrorNews />} />
        <Route path="/game" element={<Game />} />
        <Route path="/snakegame" element={<SnakeGame />} />
        <Route path="/solarsystem" element={<SolarSystem/>} />
      </Routes>
      <ToastContainer /> 
    </>
  );
}

export default App;


