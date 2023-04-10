import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Context } from './index';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar/Navbar';
import { check } from './http/authAPI';
import './styles/App.css';
import Spinner from './components/UI/Spinner/Spinner'
import mapJwtClaims from './utils/mapJwtClaims';
import jwtDecode from 'jwt-decode';


const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(data => {
      user.setIsAuth(true);
      user.setUser(mapJwtClaims(jwtDecode(localStorage.getItem('token'))))
    }).finally(() => setLoading(false));
  }, [user])

  if(loading) {
    return <Spinner />
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
});

export default App;
