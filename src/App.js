import React, { createContext, useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NoMatch from './Components/NoMatch/NoMatch';
import Destination from './Components/Destination/Destination';
import Booking from './Components/Booking/Booking';
import Login from './Components/Login/Login';
import Header from './Components/Header/Header';


export const LocationContext = createContext()

function App() {
  const [place, setPlace] = useState('coxbazar')
  return (
    <div className="bg-img">
      
      <LocationContext.Provider value={[place, setPlace]}>
    <Router>
    <Header></Header>
      <Switch>
        <Route path="/home">
        <Home></Home>
        </Route>
        <Route exact path="/">
        <Home></Home>
        </Route>
        <Route path="/news">
        <Home></Home>
        </Route>
        <Route path="/destination">
        <Destination></Destination>
        </Route>
        <Route path="/contact">
        <Booking></Booking>
        </Route>
        <Route path="/login">
        <Login></Login>
        </Route>
        <Route path="*">
        <NoMatch></NoMatch>
        </Route>
      </Switch>
    </Router>
    </LocationContext.Provider>
    </div>
  );
}

export default App;
