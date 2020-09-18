import React, { useContext } from 'react';
import { LocationContext } from '../../App';
import HeaderTwo from '../HeaderTwo/HeaderTwo';
import mapImg from '../../Image/map.png'
import SubPlaceContainer from '../SubPlaceContainer/SubPlaceContainer';

const Booking = () => {
  const [{ place, selectedPlace }] = useContext(LocationContext)
  return (
    <div className="back-img">
      <HeaderTwo></HeaderTwo>
      <h3 className="pt-4 ml-4 font-weight-bold">Stay with {place}</h3>
      <div className="row">
        <div className="col-md-6">
          {
            selectedPlace && selectedPlace.subPlace &&
            selectedPlace.subPlace.map(place => <SubPlaceContainer place={place} />)
          }
        </div>
        <div className="col-md-6">
          <img style={{ width: '500px' }} src={mapImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Booking;