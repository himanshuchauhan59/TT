import React, { useEffect } from 'react';
import './App.css';
import LoginGoogle from './component/login';
import Home from './component/home';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      setIsUserLoggedIn(true);
    }

    chrome.runtime.onMessage.addListener((message: any, sender: any, sendResponse: any) => {
      if (message.type === 'FROM_BACKGROUND') {
        console.log("Message from background script:", message.payload);
        if (message.payload.type === 'LOGIN_SUCCESS') {
          localStorage.setItem('userInfo', JSON.stringify(message.payload.data));
          setIsUserLoggedIn(true);
        }
      }
    });
  }, [])

  return (
    <div className="App">
      {isUserLoggedIn ? <Home /> : <LoginGoogle />}
    </div>
  );
}

export default App;
