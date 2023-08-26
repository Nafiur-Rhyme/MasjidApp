import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import Dashboard from './src/components/Dashboard';
import Login from './src/components/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isCached = async () => {
    try {
      const cached = await AsyncStorage.getItem("keepLoggedIn");
      console.log("User Login Status: " + cached);
      setIsLoggedIn(cached);
    } catch (error) {
      console.error("No cached value found");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    AsyncStorage.setItem("keepLoggedIn", "");
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    isCached();
  }, []);

  return (
    <View>
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </View>
  )
};



export default App;