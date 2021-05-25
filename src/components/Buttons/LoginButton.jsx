import React from 'react';
import './LoginButton.css'

const LoginButton = ({ value, onClick }) => {
  return (
    <input className='login-button' type="button" value={value} onClick={onClick}></input>
  );
}

export default LoginButton;
