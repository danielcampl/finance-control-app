import './App.css';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/dashboard/painel" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
