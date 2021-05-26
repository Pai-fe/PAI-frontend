import React from 'react';

import './InputComponent.css';

const InputComponent = ({ type, value, disabled, onChange, onClick }) => {
  const renderOnChangeInput = () => {
    return (
     <div className='login-input'>
        <input type={type} value={value} onChange={onChange} disabled={disabled}></input>
     </div> 
    );
  }

  const renderOnClickInput = () => {
    return (
      <div className='login-input'>
        <input type={type} value={value} onClick={onClick} disabled={disabled}></input>
      </div>
    );
  }
  return (
    <>
    {onChange ? renderOnChangeInput() : renderOnClickInput()}
    </>
  );
}

export default InputComponent;
