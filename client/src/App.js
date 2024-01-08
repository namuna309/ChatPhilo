// Library
import { Routes, Route } from 'react-router-dom';

// CSS
import './CSS/body.css';
import './App.css';

// Route
import Main from './Routes/App/main';
import Login from './Routes/App/login';
import Signup from './Routes/App/signup';
// Component

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='Login' element={<Login/>}/>
        <Route path='signup/*' element={<Signup/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
