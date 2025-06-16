// src/App.js
import { Routes, Route } from 'react-router-dom';
import Main from './pages/main/index';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <ToastContainer /> 
    </>
  );
}

export default App;


