import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderComponent from './components/headerComponent';
import ListEmployeeComponent from './components/feedComponent';



function App() {
 
  return (
    <div>
      <Router>
        <HeaderComponent/>
          <div className='container'>
            <switch>
              <Route path = "/" exact component = {ListEmployeeComponent}></Route>
            </switch>
          </div>

      </Router>
    </div>

  );
}

export default App;