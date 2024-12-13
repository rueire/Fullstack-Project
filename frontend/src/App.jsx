import UserView from './components/UserView';
import AdminView from './components/AdminView';
import './App.css'; 
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ButtonLink from './components/Buttonlink';
import Assignment from './components/Assignment';

function App() {

  // HomeView component to render the home page
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
    <BrowserRouter> {/*BrowserRouter to enable routing */}
      <div>
        <Routes> {/* Define the routes for the application */}
          <Route path="/" element={<HomeView />} />
          <Route path="/user" element={<UserView />} />
          <Route path="/adminmain" element={<AdminView />} />
          <Route path="/adminedittasks" element={<AdminView />} />
          <Route path="/engfinn" element={<Assignment mode='engfinn' />} />
          <Route path="/finneng" element={<Assignment mode='finneng'/>} />
          <Route path="*" element={<h1>Wrong Place!</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
