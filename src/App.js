import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import LandingPage from './components/Pages/LandingPage';
import About from './components/Pages/About';
import NotFound from './components/Pages/NotFound';
import CreateNewTour from './components/Pages/CreateNewTour';

import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
//import CreateNewTour from './components/CreateNewTour/CreateNewTour'
//import BrowseTours from './components/BrowseTours'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/createnewtour" element={<CreateNewTour />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

