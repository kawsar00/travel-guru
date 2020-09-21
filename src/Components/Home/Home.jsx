import React, { useContext } from 'react';
import Header from '../Header/Header';
import Location from '../Location/Location';
import './Home.css';
import { LocationContext } from '../../App';
import coxBazar from '../../Image/Rectangle-1.png'
import sreemongol from '../../Image/Sreemongol.png'
import sundorbon from '../../Image/sundorbon.png'


const Home = () => {
  const [{ setPlace, selectedPlace }] = useContext(LocationContext)
  return (
    <div>
      <Header></Header>
      <div style={{ padding: '100px' }} className="row">
        <div className="col-md-4 col-12">
          {
            selectedPlace &&
            <Location />
          }
        </div>
        <div className="col-md-8 col-12 d-flex location-img">
          <div onClick={() => setPlace("cox's bazar")} className="col-md-4 col-12">
            <img src={coxBazar} alt="" />
            <h3 className="text-white font-weight-bold">COX'S BAZAR</h3>
          </div>
          <div onClick={() => setPlace('sreemongol')} className="col-md-4 col-12">
            <img src={sreemongol} alt="" />
            <h3 className="text-white font-weight-bold">SREEMONGOL</h3>
          </div>
          <div onClick={() => setPlace('sundarban')} className="col-md-4 col-12">
            <img src={sundorbon} alt="" />
            <h3 className="text-white font-weight-bold">SUNDARBAN</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
