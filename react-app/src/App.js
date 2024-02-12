import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderComponent from './components/headerComponent';
import FooterComponent from './components/footerComponent';
import feedComponent from './components/feedComponent';



function App() {
 
  return (
    <div>
      <Router>
        <HeaderComponent/>
          <div className='container'>
            <switch>
              {/* <Route path = "/feed" exact component = {feedComponent}></Route> */}
            </switch>
          </div>
          <FooterComponent />
      </Router>
    </div>

  );
}

export default App;