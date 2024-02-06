// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes,Switch } from 'react-router-dom';


import SignIn from "./signIn";
import UserTable from "./userTable";
import Home from "./Home";;

function App() {
  return (
    <>
      {/* <UserTable /> */}
      <Router>
      

      <Routes>
      <Route path='/' element={<SignIn/>} />
      <Route path='/user-table' element={<UserTable/>} />
    
    
      </Routes>
      </Router>
    
    </>
  );
}

export default App;
