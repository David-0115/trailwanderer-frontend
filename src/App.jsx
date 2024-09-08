import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import TWRoutes from './Routes';
import { Container } from '@mui/material';
import AppContext from './AppContext'
import Navbar from './Navbar'
import UserAlert from './UserAlert';
import useLocalStorage from './useLocalStorage';
import './App.css'


function App() {
  const [appData, setAppData] = useState({});
  const [alertMsg, setAlertMsg] = useState(null);
  const { setStorage, getStorage } = useLocalStorage();

  useEffect(() => {
    if (!appData.user) {
      const user = getStorage('user', true);
      if (user) {
        setAppData({ 'user': user })
      }
    } else {
      setStorage('user', appData.user, true);
    }
  }, [appData.user])

  const updateAppData = (key, val) => {
    setAppData(data => ({
      ...data,
      [key]: val
    }));
  }

  const updateAlertMsg = (type, text) => {
    setAlertMsg({
      type: type,
      text: text,
    });
  }


  const deleteAlertMsg = () => {
    setAlertMsg(null)
  }


  return (
    <>

      <BrowserRouter>
        <AppContext.Provider value={{
          appData, updateAppData,
          alertMsg, updateAlertMsg, deleteAlertMsg
        }}>
          <Navbar />
          <Container sx={{
            mt: '64px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}>
            {alertMsg ? <UserAlert /> : null}

            <TWRoutes />

          </Container>
        </AppContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
