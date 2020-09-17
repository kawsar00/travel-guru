import React from 'react';
import './Location.css';
import coxBazar from '../../Image/Rectangle-1.png'
import sreemongol from '../../Image/Sreemongol.png'
import sundorbon from '../../Image/sundorbon.png'
import { Link } from 'react-router-dom';



const Location = () => {
  return (
    <div style={{ padding: '100px' }} className="row">
      <div className="col-md-4">
        <h1 style={{ fontSize: '50px' }} className="text-white font-weight-bold">Lorem ipsum dolor sit amet.</h1>
        <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt omnis mollitia quis at, delectus inventore porro. Veritatis doloremque reprehenderit incidunt dolorum dolor? Incidunt dolorum explicabo velit molestiae ducimus corrupti rerum.</p>
        <Link to='/destination' className="btn btn-warning">Booking &#8594;</Link>
      </div>
      <div className="col-md-8 d-flex location-img">
        <div className="col-md-4">
          <img src={coxBazar} alt="" />
          <h3 className="text-white font-weight-bold">COX'S BAZAR</h3>
        </div>
        <div className="col-md-4">
          <img src={sreemongol} alt="" />
          <h3 className="text-white font-weight-bold">SREEMONGOL</h3>
        </div>
        <div className="col-md-4">
          <img src={sundorbon} alt="" />
          <h3 className="text-white font-weight-bold">SUNDARBAN</h3>
        </div>
      </div>
    </div>
  );
};

export default Location;