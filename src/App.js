import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <main>
        <Routes>
          <Route path= "/" element={<Footer />}></Route>
        </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;

