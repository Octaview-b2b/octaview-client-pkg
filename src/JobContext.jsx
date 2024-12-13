import React, { createContext, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children, url, background, textColor, buttonColor, api, userId }) => {
  return (
    <AppContext.Provider value={{ url, background, textColor, buttonColor, api, userId }}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => {
  return useContext(AppContext);
};
