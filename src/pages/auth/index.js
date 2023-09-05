import React, { useState} from 'react'
import SignUpForm from '../../components/signupform';
import Login from '../../components/login_form';
import Logo from '../../components/logo';
import './index.css';


const AuthPage = () => {
    const [isSignup, setIsSignup] = useState(false);

    const handleButtonClick = () => {
        setIsSignup(isSignup ? false : true);
    }

  return (

   <section className="auth-page">
      <div className="logo-container">
        <Logo />
        <button className="login-button btn-sm" onClick={handleButtonClick}>{isSignup ? "Login" : "Sign up"}</button>
      </div>

      {isSignup ?
      <SignUpForm />
      :
      <Login />
      }
      
    </section>
  )
}

export default AuthPage