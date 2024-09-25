import React from 'react';
import Dashboard from './Dashboard.jsx';
import Form from './Form.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SalesContextProvider } from './context/SalesContext.js';
const App = () => (
  
    <div className="app">
        <SalesContextProvider>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path='/form' element={<Form/>}/>
        </Routes>
        </BrowserRouter>
        </SalesContextProvider>
    </div>

);

export default App;
