import React, { useEffect, useState } from "react";
import app from 'firebase/app';
import firebase from "./firebase";

export const FirebaseContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return <>Loading...</>
  }

  return (
    <FirebaseContext.Provider
      value={{
        currentUser,
        firebase
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
