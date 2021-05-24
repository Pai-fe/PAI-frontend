import React from 'react';

const LoginButton = ({ value, onClick }) => {
  return (
    <input type="button" value={value} onClick={onClick}></input>
  );
}

export default LoginButton;
