import React from 'react';

import './Dropdown.css'

const DropDown = ({ optionsList, value, onChange }) => {
  let optionItems = optionsList.map((o) =>
      <option key={o.text}>{o.text}</option>
  );
  return (
    <select className='select-dropdown' value={value} onChange={onChange}>
      {optionItems}
    </select>
  );
}

export default DropDown;
