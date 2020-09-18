import React from 'react';

const SubPlaceContainer = (props) => {
  const { service, offer, condition, price, title, star, image } = props.place
  return (
    <div className="row">
      <div className="d-flex p-4">
        <div className="col-md-6">
          <img style={{ width: '250px' }} src={image} alt="" />
        </div>
        <div className="col-md-6">
          <h4>{title}</h4>
          <p>{service}</p>
          <p>{offer}</p>
          <p>{condition}</p>
          <div >
            <span style={{ marginRight: '45px' }}><img style={{ width: '17px' }} src={star} alt="" />4.9(20)</span>
            <span>{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubPlaceContainer;