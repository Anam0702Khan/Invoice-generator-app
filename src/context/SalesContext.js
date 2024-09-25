import React, { createContext, useState } from 'react';

const SalesContext = createContext();

const SalesContextProvider = ({ children }) => {
  const [sales, setSales] = useState([]);

  return (
    <SalesContext.Provider value={{ sales, setSales }}>
      {children}
    </SalesContext.Provider>
  );
};

export { SalesContext, SalesContextProvider };