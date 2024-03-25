import React, { useState } from 'react';
import { Input } from '../Input/Input';
import '../../App.css';

export const User = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogIn, setIsLogIn] = useState(false);

  const handleSignUpLogin = (e) => {
    e.preventDefault();
    
    if (isLogIn) {
      console.log('Signing up with email:', email, 'and password:', password);
    } 
    else {
      console.log('Logging in with email:', email, 'and password:', password);
    }
  };

  return (
    <div id={Style.signUpContainer}>
      <h2>{isLogIn ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSignUpLogin}>
        <div>
          <label>Email:</label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">{isLogIn ? 'Sign Up' : 'Login'}</button>
      </form>
      <p onClick={() => setIsLogIn(!isLogIn)}>
        {isLogIn ? 'Already have an account?' : 'Don\'t have an account?'}
      </p>
    </div>
  );
};
