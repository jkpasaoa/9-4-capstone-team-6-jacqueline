import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import LandingPage from './Components/Pages/LandingPage';
import About from './Components/Pages/About';
import NotFound from './Components/Pages/NotFound';
import CreateNewTour from './Components/Pages/CreateNewTour';

import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
//import CreateNewTour from './components/CreateNewTour/CreateNewTour'
//import BrowseTours from './components/BrowseTours'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <main>
        <div className="content-container">
        {/* Check App.css for content-container for padding */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/createnewtour" element={<CreateNewTour />} />
          </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
