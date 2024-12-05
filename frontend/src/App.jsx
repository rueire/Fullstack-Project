import UserView from './components/UserView';
import FetchWords from './components/FetchWords';
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
          {/* <button id='admin'>Admin Material</button> */}
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
          <Route path="/engfinn" element={<FetchWords mode='engfinn' />} />
          <Route path="/finneng" element={<FetchWords mode='finneng'/>} />
          <Route path="*" element={<h1>Do not do that!</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
