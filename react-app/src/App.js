import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/headerComponent';
import FooterComponent from './components/footerComponent';
import FeedComponent from './components/feedComponent';



function App() {

  return (
    <div className='app-container'>
      <Router>
        <HeaderComponent />
        <div className='content-wrap'>
          <Routes>
            <Route path="/" element={<FeedComponent />} />
          </Routes>
        </div>
        <FooterComponent />
      </Router>

    </div>

  );
}

export default App;