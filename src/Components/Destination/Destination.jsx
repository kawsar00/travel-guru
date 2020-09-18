import React, { useContext } from 'react';
import './Destination.css';
import { Button, Form, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LocationContext } from '../../App';
import Header from '../Header/Header';



const Destination = () => {
  const [{ selectedPlace }] = useContext(LocationContext)
  return (
    <div>
      <Header></Header>
      {
        selectedPlace &&
        <div style={{ padding: '100px' }} className="row d-flex justify-content-between">
          <div className="col-md-5">
            <h1 style={{ fontSize: '50px' }} className="text-white font-weight-bold">{selectedPlace.title}</h1>
            <p className="text-white">{selectedPlace.description}</p>
          </div>
          <div className="col-md-5 booking-form">
            <Form>
              <Form.Group >
                <Form.Label className="text-muted">Origin</Form.Label>
                <Form.Control className="font-weight-bold" type="text" />
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-muted">Destination</Form.Label>
                <Form.Control className="font-weight-bold" type="text" defaultValue={selectedPlace.title} disabled />
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
      }
    </div>
  );
};

export default Destination;