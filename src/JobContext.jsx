import React, { createContext, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children, background, textColor, buttonColor, api, userId }) => {
  return (
    <AppContext.Provider value={{  background, textColor, buttonColor, api, userId }}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => {
  return useContext(AppContext);
};
