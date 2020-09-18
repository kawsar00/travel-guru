import React, { useState } from 'react';
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

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [newUser] = useState(false)
  const [isLoginForm, setIsLoginForm] = useState(false)
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email:'',

  })
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
    const user = res.user;
    // ...
    console.log('facebook user information', user)
  }).catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  });
}


//update user name 
const UpdateUserInfo = name => {
  var user = firebase.auth().currentUser;

  user.updateProfile({
  displayName: name
  })
  .then(function() {
      console.log('user update successfully')
  })
  .catch(function(error) {
      console.log(error)
  });
}
//****************USER EMAIL, PASSWORD SIGN IN & SIGN OUT**************** */

//____________code for sign in and sign up user_________________________
const handleSubmit = (e) => {
  if (newUser && user.email && user.password) {
   //sign up user code
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then(res => {
              const newUserInfo = { ...user }
              newUserInfo.error = ''
              newUserInfo.success = true
              setUser(newUserInfo)
              UpdateUserInfo(user.name)
          })
          .catch(function (error) {
              const newUserInfo = { ...user }
              newUserInfo.error = error.message
              newUserInfo.success = false
              setUser(newUserInfo)
          });
  }
   //sign in user code
  if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
          const newUserInfo = { ...user }
          newUserInfo.error = ''
          newUserInfo.success = true
          setUser(newUserInfo)
          console.log('sign in user info', res.user)
      })
      .catch(function(error) {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message
          newUserInfo.success = false
          setUser(newUserInfo)
        });
  }
  
  e.preventDefault()
}

//_______________________handle blur function_________________________
const handleBlur = (e) => {
console.log(e.target.value, e.target.name)

  let isFieldValid = true
  if(e.target.name === 'email') {
    isFieldValid = /\S+@\S+\.\S+/.test(e.target.value) 
    console.log(isFieldValid)
  }
  if(e.target.name === 'password') {
    const isPasswordValid = e.target.value.length > 6 //must be more than 6 digit
    const PasswordHasNumber = /\d{1}/.test(e.target.value) // should have minimum 1 number
    isFieldValid = isPasswordValid && PasswordHasNumber
    console.log(isPasswordValid, PasswordHasNumber)
  }
  if (isFieldValid) {
    const newUserInfo = {...user}
    newUserInfo[e.target.name] = e.target.value
    setUser(newUserInfo)
  }
  }
//**************END USER EMAIL, PASSWORD SIGN IN & SIGN OUT************** */


  return (
    <div className="back-img">
     { <HeaderTwo handleGoogleLogOut ={handleGoogleLogOut}></HeaderTwo>}
      <div className="p-4 text-center">
      <p style={{color:"red"}}>{user.error}</p>
        {user.success && <p style={{color:"green"}}>User {newUser ? 'Created' : 'LoggedIn'}  Successfully</p>}

      </div>
      <MDBContainer>
        <MDBRow>
          <MDBCol md="5" className="from-style">
            {
              isLoginForm ?
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
                <span className="">Don’t have an account?</span> <span><Link className="text-warning font-weight-bold" onClick={()=>setIsLoginForm(false)}>Create an account</Link> </span>
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
                <span className="">Already have an account?</span> <span><Link  className="text-warning font-weight-bold" onClick={()=>setIsLoginForm(true)}>Login</Link> </span>
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