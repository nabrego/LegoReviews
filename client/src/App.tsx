import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RatedSets } from './pages/rated-sets';
import { Home } from './pages/home';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<h1>Auth</h1>} />
            <Route path="/rated-sets" element={<RatedSets />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App