// Library
import { Routes, Route } from 'react-router-dom';

// CSS
import './CSS/body.css';
import './App.css';

// Route
import Main from './Routes/main';

// Component

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>} />
      </Routes>
     
    </div>
  );
}

export default App;
