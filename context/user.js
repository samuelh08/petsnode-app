import React, { useEffect, useState } from 'react';

const UserContext = React.createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  function setUserState(userState) {
    localStorage.setItem('user', JSON.stringify(userState));
    setUser(userState);
  }

  useEffect(() => {
    try {
      const state = localStorage.getItem('user');
      if (state) {
        const parsedState = JSON.parse(state);
        setUser(parsedState);
      }
    } catch (error) {
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: setUserState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
