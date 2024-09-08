import React, { useEffect, useContext } from 'react';
import AppContext from './AppContext';
import { useNavigate, useLocation } from 'react-router-dom';


const AuthRedirect = () => {
  const { updateAppData } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const encodedUser = params.get('user');
    if (encodedUser) {
      const decodedUser = decodeURIComponent(encodedUser);
      const parsedUser = JSON.parse(decodedUser);
      updateAppData('user', parsedUser);
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [location, history]);

  return null;
};

export default AuthRedirect;
