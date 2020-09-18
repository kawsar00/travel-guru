import React, { useState } from 'react';
import HeaderTwo from '../HeaderTwo/HeaderTwo';
import './Login.css'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Button, Input, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import fbImg from '../../Icon/fb.png'
import googleImg from '../../Icon/google.png'

const Login = () => {
  const [newUser, setNewUser] = useState(false)
  return (
    <div className="back-img">
      <HeaderTwo></HeaderTwo>
      <MDBContainer >
        <MDBRow>
          <MDBCol md="5" className="from-style">
            <form>
              <p className="h5 text-center mb-4 font-weight-bold">Create an account</p>
              <div className="grey-text font-weight-bold">
              <MDBInput label="First Name" group type="text" validate error="wrong"
                  success="right" />
                  <MDBInput label="Last Name" group type="text" validate error="wrong"
                  success="right" />
                <MDBInput label="Username or Email"  group type="email" validate error="wrong"
                  success="right" />
                <MDBInput label="Password" group type="password" validate />
                <MDBInput label="Confirm Password" group type="password" validate />
              </div>
              <div className="text-center">
                <Button className="btn btn-warning w-100">Login</Button>
              </div>
              <div className="text-center mt-3">
                <span className="">Already have an account?</span> <span><Link className="text-warning font-weight-bold">Login</Link> </span>
                </div>
            </form>
          </MDBCol>
        </MDBRow>
        <MDBContainer >
        <MDBRow>
          <MDBCol md="5" className="from-style">
            <form>
              <p className="h5 text-center mb-4 font-weight-bold">Create an account</p>
              <div className="grey-text font-weight-bold">
                <MDBInput label="Username or Email"  group type="email" validate error="wrong"
                  success="right" />
                <MDBInput label="Password" group type="password" validate />
              </div>
              <div className='my-4 d-flex justify-content-between'>
                <div><Input type="checkbox"></Input><span className="logIn text-dark font-weight-bold ml-2">Remember Me</span></div>
                <div><span><Link className="text-warning font-weight-bold">Forget Password</Link> </span></div>
                  
                </div>
              <div className="text-center">
                <Button className="btn btn-warning w-100 font-weight-bold">Login</Button>
              </div>
              
              <div className="text-center mt-3">
                <span className="">Don’t have an account?</span> <span><Link className="text-warning font-weight-bold">Create an account</Link> </span>
                </div>
            </form>
          </MDBCol>
        </MDBRow>
        </MDBContainer>
        <div className="otherLogIn">
          <span className="text-center mb-4 d-block">or</span>
          <Link className="logIn text-dark font-weight-bold"><img  style={{width:'23px', marginRight:'80px'}} src={fbImg} alt=""/>Continue with Facebook</Link> <br/>
          <Link className="logIn text-dark font-weight-bold"><img style={{width:'23px', marginRight:'80px'}} src={googleImg} alt=""/>Continue with Google</Link>
        </div>
        
      </MDBContainer>

    </div>
  );
};

export default Login;