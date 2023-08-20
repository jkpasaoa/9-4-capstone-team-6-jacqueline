import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
//import CreateNewTour from './Components/CreateNewTour/CreateNewTour

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <main>
        <Routes>
          {/* <Route path="/home" element={<LandingPage />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
           {/* <Route path="/createnewtour" element={<CreateNewTour />} /> */}
        </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

