// Library
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

// CSS
import './CSS/body.css';
import './App.css';

// Route
import Main from './Routes/App/main';
import Login from './Routes/App/login';
import Signup from './Routes/App/signup';
import Chat from './Routes/App/chat';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Component



function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='Login' element={<Login/>}/>
        <Route path='signup/*' element={<Signup/>}/>
        <Route path='chat/*' element={<Chat/>} />
      </Routes>
     
    </div>
  );
}

export default App;
