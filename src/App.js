import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route path="/home" exact element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
