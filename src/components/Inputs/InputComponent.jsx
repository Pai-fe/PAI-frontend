import React from 'react';

const InputComponent = ({ type, value, disabled, onChange, onClick }) => {
  const renderOnChangeInput = () => {
    return (
      <input type={type} value={value} onChange={onChange} disabled={disabled}></input>
    );
  }

  const renderOnClickInput = () => {
    return (
      <input type={type} value={value} onClick={onClick} disabled={disabled}></input>
    );
  }
  return (
    <>
    {onChange ? renderOnChangeInput() : renderOnClickInput()}
    </>
  );
}

export default InputComponent;
