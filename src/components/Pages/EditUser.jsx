import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

//Store
import { useDispatch, useSelector } from 'react-redux';
import { getMe, updateUser } from '../../redux/actions/userActions';

//Components
import InputComponent from '../Inputs/InputComponent';
import LoginButton from '../Buttons/LoginButton';

//Request
import { axiosHelperCall } from '../../helpers/axios.helper';
import { CONFIG } from '../../helpers/config';
import DropDown from '../Dropdowns/Dropdown';

import './EditUser.css'

const optionsList = [
  {
    value: "Admin",
    text: "Admin"
  },
  {
    value: "User",
    text: "User"
  },
];

const EditUser = ({ user, onClick }) => {
  const history = useHistory();

  const [email, setEmail] = useState(user?.email);
  const [role, setRole] = useState(user?.uloga);

  const onChangeEmail = (event) => {
    //Email validation here
    setEmail(event?.target?.value)
  }

  const onChangeSelect = (event) => {
    //Password validation here
    setRole(event?.target?.value)
  }

  const onClickLoginButton = async() => {
    try{
      if(!(email && role)) {
        // Show error
        return;
      }
      const { data, status } = await axiosHelperCall('PUT', `${CONFIG.APP_URL}/user/assignRole`, {
        email: email,
        uloga: role
      }, {});
      // Show creation message
      onClick();
    } catch(e){
      console.log('TAG-ERROR','FAILED REQUEST AT CreateUser.jsx');
    }
  }

  return (
    <div className='edit-user-container'>
      <h1>User Role Editor</h1>
      <label className='edit-user-label'>Email:</label>
      <InputComponent 
        type="email"
        value={email}
        onChange={onChangeEmail}
        disabled
      />
      <label className='edit-user-label'>Role:</label>
      <br/>
      <DropDown 
        optionsList={optionsList}
        value={role}
        onChange={onChangeSelect}
      />
      <InputComponent 
          type='button'
          onClick={onClickLoginButton}
          value='Update'
      />
    </div>
  );
}

export default EditUser;
