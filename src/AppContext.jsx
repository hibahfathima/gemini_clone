import React, { createContext, useContext, useState } from "react";


const AppContext = createContext();


export const AppProvider = ({ children }) => {
  const [questionArray, setQuestionArray] = useState([]);

  return (
    <AppContext.Provider value={{ questionArray, setQuestionArray }}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => useContext(AppContext);
