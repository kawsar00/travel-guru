import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Location from '../Location/Location';
import './Home.css';
import fakeData from '../../FakeData/FakeData'
import { LocationContext } from '../../App';
import coxBazar from '../../Image/Rectangle-1.png'
import sreemongol from '../../Image/Sreemongol.png'
import sundorbon from '../../Image/sundorbon.png'
import { Link } from 'react-router-dom';


const Home = () => {
  const [place, setPlace] = useContext(LocationContext)

  const [location, setLocation] = useState([])
  useEffect(()=>{
    console.log(place)
    const matchLocation = fakeData.filter(data => data.location.toLowerCase() === place.toLowerCase())
    setLocation(matchLocation)
    console.log(matchLocation, location)
  },[place])

  return (
    <div>
      <Header></Header>
    <div style={{ padding: '100px' }} className="row">
       
    <div className="col-md-4">
     {
        location.map(location => <Location location={location}></Location>)
      }
    </div>
    <div className="col-md-8 d-flex location-img">
      <div onClick={() => setPlace("COX'S BAZAR")} className="col-md-4">
        <img src={coxBazar} alt="" />
        <h3 className="text-white font-weight-bold">COX'S BAZAR</h3>
      </div>
      <div onClick={() => setPlace('SREEMONGOL')} className="col-md-4">
        <img src={sreemongol} alt="" />
        <h3 className="text-white font-weight-bold">SREEMONGOL</h3>
      </div>
      <div onClick={() => setPlace('SUNDARBAN')} className="col-md-4">
        <img src={sundorbon} alt="" />
        <h3 className="text-white font-weight-bold">SUNDARBAN</h3>
      </div>
    </div>
  </div>
  </div>
  );
};

export default Home;