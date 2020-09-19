import React, { useContext, useState } from 'react';
import HeaderTwo from '../HeaderTwo/HeaderTwo';
import './Login.css'
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import { Button, Input } from 'semantic-ui-react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import fbImg from '../../Icon/fb.png'
import googleImg from '../../Icon/google.png'
import { LocationContext } from '../../App';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [{ user, setUser }] = useContext(LocationContext)
  const [newUser, setNewUser] = useState(false)

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  //**********************GOOGLE SIGN IN & SIGN OUT************************ */
//code for google sign and their information
var googleProvider = new firebase.auth.GoogleAuthProvider();
const handleGoogleLogIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const { displayName, email } = result.user;
            const signInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
            }
            setUser(signInUser)
            history.replace(from);
        })
        .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
}
//code for google sign out user
const handleGoogleLogOut = () => {
  firebase.auth().signOut()
  .then(res => {
      const signOutUser = {
          isSignIn: false,
          name: '',
          email: '',
          photo: '',
          success: false,
          error: '',
      }
      setUser(signOutUser)
    })
    .catch(error => {
      console.log(error)
    });
}

//********************END GOOGLE SIGN IN & SIGN OUT********************** */


//function for facebook sign in button
const fbProvider = new firebase.auth.FacebookAuthProvider();
const handleFbSignIn = () => {
  firebase.auth().signInWithPopup(fbProvider)
  .then(res => {
    // The signed-in user info.
    const { displayName, email } = res.user;
      const signInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
      }
      setUser(signInUser)
      history.replace(from);
    // ...
    console.log('facebook user information', user)
  }).catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  });
}
//********************END FACEBOOK SIGN IN ********************** */

//****************USER EMAIL, PASSWORD SIGN IN & SIGN OUT**************** */

//____________code for sign in and sign up user_________________________
//function for sign up form
const handleSubmit = (e) => {
  // console.log(user.email, user.password)

  // this code for the sign up user
  if (newUser && user.email && user.password) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = { ...user }
        newUserInfo.error = ''
        newUserInfo.success = true
        setUser(newUserInfo)
        updateUseName(user.name)
      })
      .catch(error => {
        const newUserInfo = { ...user }
        newUserInfo.error = error.message
        newUserInfo.success = false
        setUser(newUserInfo)
      });
  }

  // this code for the sign in user
  if (!newUser && user.email && user.password) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = { ...user }
        newUserInfo.error = ''
        newUserInfo.success = true
        setUser(newUserInfo)
        console.log('Sign in user info', res.user)
      })
      .catch(error => {
        const newUserInfo = { ...user }
        newUserInfo.error = error.message
        newUserInfo.success = false
        setUser(newUserInfo)
      });
  }
  e.preventDefault()
}
//**************END USER EMAIL, PASSWORD SIGN IN & SIGN OUT************** */

//update user name and other information
const updateUseName = name => {
  var user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  }).then(res => {
    console.log('User name update successfully')
  })
  .catch(error => {
    console.log(error)
  });
}

//_______________________handle blur function_________________________
const handleBlur = (e) => {
  // console.log(e.target.name, e.target.value) //to show this event value with name
  let isFieldValid = true;
  if (e.target.name === 'email') {
    isFieldValid = /\S+@\S+\.\S+/.test(e.target.value) //use regular expression for email validation
  }
  if (e.target.name === 'password') {
    const isPasswordValid = e.target.value.length > 6 //pass. should be more than 6 characters
    const passwordHasNumber = /\d{1}/.test(e.target.value) // should have minimum 1 number
    isFieldValid = isPasswordValid && passwordHasNumber
  }
  if (isFieldValid) {
    const newUserInfo = { ...user }
    newUserInfo[e.target.name] = e.target.value
    setUser(newUserInfo)
  }
}
  return (
    <div className="back-img">
     <HeaderTwo />
     <div className="p-4 text-center">
       {/* to show successful/error message on screen */}
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>
      }
      </div>
      <MDBContainer>
        <MDBRow>
          <MDBCol md="5" className="from-style">
            {
              newUser ?
              <form onSubmit={handleSubmit}>
              <p className="h5 text-center mb-4 font-weight-bold">Log In</p>
              <div className="grey-text font-weight-bold">
                <MDBInput label="Username or Email"  group type="email" required/>
                <MDBInput label="Password" group type="password" required />
              </div>
              <div className='my-4 d-flex justify-content-between'>
                <div><Input type="checkbox"></Input><span className="logIn text-dark font-weight-bold ml-2">Remember Me</span></div>
                <div><span><Link className="text-warning font-weight-bold">Forget Password</Link> </span></div>
                </div>
              <div className="text-center">
                <Button className="btn btn-warning w-100 font-weight-bold">Login</Button>
              </div>
              <div className="text-center mt-3">
                <span className="">Don’t have an account?</span> <span><Link className="text-warning font-weight-bold" onClick={()=>setNewUser(false)}>Create an account</Link> </span>
                </div>
            </form>
            :
            <form onSubmit={handleSubmit}>
              <p className="h5 text-center mb-4 font-weight-bold">Create an account</p>
              <div className="grey-text font-weight-bold">
              <MDBInput onBlur={handleBlur} label="First Name" name="name" group type="text" required/>
                  <MDBInput onBlur={handleBlur} label="Last Name" name="name" group type="text" required/>
                <MDBInput onBlur={handleBlur} name="email" label="Username or Email"  group type="email" required/>
                <MDBInput onBlur={handleBlur} label="Password" name="password" group type="password" required />
                <MDBInput onBlur={handleBlur} label="Confirm Password" name="password" group type="password" required />
              </div>
              <div className="text-center">
                <Button className="btn btn-warning w-100">Register</Button>
              </div>
              <div className="text-center mt-3">
                <span className="">Already have an account?</span> <span><Link  className="text-warning font-weight-bold" onClick={()=>setNewUser(true)}>Login</Link> </span>
                </div>
            </form>
            }
          </MDBCol>
        </MDBRow>
      </MDBContainer>
        <div className="otherLogIn">
          <span className="text-center mb-4 d-block">or</span>
          <Link onClick={handleFbSignIn} className="logIn text-dark font-weight-bold"><img  style={{width:'23px', marginRight:'80px'}} src={fbImg} alt=""/>Continue with Facebook</Link> <br/>
          <Link onClick={handleGoogleLogIn} className="logIn text-dark font-weight-bold"><img style={{width:'23px', marginRight:'80px'}} src={googleImg} alt=""/>Continue with Google</Link>
        </div>

    </div>
  );
};

export default Login;