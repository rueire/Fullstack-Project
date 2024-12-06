import UserView from './components/UserView';
import FetchWords from './components/FetchWords';
import AdminView from './components/AdminView';
import './App.css'; 
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ButtonLink from './components/Buttonlink';

function App() {

  function HomeView() {
    return<>
      <div className='main-form'>
      <h1>Language Learning Application</h1>
      <div className='home-buttons'>
          <ButtonLink to="/user">User Page</ButtonLink>
          <ButtonLink to="/adminmain" id='admin-btn'>Admin Page</ButtonLink>
      </div>
    </div>
    </>
  };

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/user" element={<UserView />} />
          <Route path="/adminmain" element={<AdminView />} />
          <Route path="/adminedittasks" element={<AdminView />} />
          <Route path="/engfinn" element={<FetchWords mode='engfinn' />} />
          <Route path="/finneng" element={<FetchWords mode='finneng'/>} />
          <Route path="*" element={<h1>Wrong Place!</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
