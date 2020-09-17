import React, { useContext, useEffect, useState } from 'react';
import './Location.css';

import { Link } from 'react-router-dom';
import fakeData from '../../FakeData/FakeData'
import { LocationContext } from '../../App';



const Location = (props) => {
  const { title, description } = props.location
  const [place, setPlace] = useContext(LocationContext)

  return (
    <div>
      <h1 style={{ fontSize: '50px' }} className="text-white font-weight-bold">{title}</h1>
      <p className="text-white">{description}</p>
      <Link to='/destination' className="btn btn-warning">Booking &#8594;</Link>
    </div>
  );
};

export default Location;