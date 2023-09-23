import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from './Dashboard';
import Dashboardv1 from './Dashboardv1';

function App() {
  return (
    <div className="App">
    <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/dashboardv1" element={<Dashboardv1 />}></Route>
        </Routes>
    </Router>
    </div>
  );
}

export default App;
