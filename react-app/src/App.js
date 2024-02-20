import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from './components/headerComponent';
import FooterComponent from './components/footerComponent';
import FeedComponent from './components/feedComponent';
import SignUpComponent from './components/signupComponent';
import SignInComponent from './components/signinComponent';
import UserInfoComponent from './components/userInfoComponent';
import UserListComponent from './components/userListComponent';
import MessageComponent from './components/messageComponent';
import WritingComponent from './components/writingComponent';
import EditPasswordComponent from './components/editPasswordComponent';
import UserEditComponent from './components/userEditComponent';


function App() {

  return (
      <Router>
        <HeaderComponent />
        <div id = "wrapper">
          <Routes>
            <Route path="/" element={<FeedComponent />} /> 
            <Route path="/feed" element={<FeedComponent />} /> 
            <Route path="/signup" element={<SignUpComponent />} />
            <Route path="/signin" element={<SignInComponent />} />
            <Route path="/userInfo" element={<UserInfoComponent />} />
            <Route path="/userInfo/edit/info" element={<UserEditComponent />} />
            <Route path="/userInfo/edit/pw" element={<EditPasswordComponent />} />
            <Route path="/userList" element={<UserListComponent />} />
            <Route path="/message" element={<MessageComponent />} />
            <Route path="/writing" element={<WritingComponent />} />
          </Routes>
          </div>
        <FooterComponent />
      </Router>

  );
}

export default App;