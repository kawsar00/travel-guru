import React, { useContext } from 'react';
import './Destination.css';
import { Button, Form, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LocationContext } from '../../App';


const Destination = () => {
  const [place, setPlace] = useContext(LocationContext)
  return (
    <div style={{ padding: '100px' }} className="row d-flex justify-content-between">
      <div className="col-md-5">
  <h1 style={{ fontSize: '50px' }} className="text-white font-weight-bold">{place}</h1>
        <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt omnis mollitia quis at, delectus inventore porro. Veritatis doloremque reprehenderit incidunt dolorum dolor? Incidunt dolorum explicabo velit molestiae ducimus corrupti rerum.</p>

      </div>
      <div className="col-md-5 booking-form">
        <Form>
          <Form.Group >
            <Form.Label className="text-muted">Origin</Form.Label>
            <Form.Control className="font-weight-bold" type="text" />
          </Form.Group>

          <Form.Group>
            <Form.Label className="text-muted">Destination</Form.Label>
            <Form.Control className="font-weight-bold" type="text" placeholder={place}/>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label className="text-muted">From</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label className="text-muted">To</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Form.Row>
          <Link to="/contact"><Button className="w-100" variant="warning" type="submit">
            Start Booking
          </Button></Link>
          
        </Form>
      </div>
    </div>
  );
};

export default Destination;