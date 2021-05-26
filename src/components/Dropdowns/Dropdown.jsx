import React from 'react';

const DropDown = ({ optionsList, value, onChange }) => {
  let optionItems = optionsList.map((o) =>
      <option key={o.text}>{o.text}</option>
  );
  return (
    <select value={value} onChange={onChange}>
      {optionItems}
    </select>
  );
}

export default DropDown;
