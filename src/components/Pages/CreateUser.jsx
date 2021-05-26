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
import { routes } from '../AppRouter/RoutesList';

import './CreateUser.css'

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

const CreateUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const storeToken = useSelector(state => state?.userInfo?.me);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");

  const onChangeEmail = (event) => {
    //Email validation here
    setEmail(event?.target?.value)
  }

  const onChangePassword = (event) => {
    //Password validation here
    setPassword(event?.target?.value)
  }

  const onChangeSelect = (event) => {
    //Password validation here
    setRole(event?.target?.value)
  }

  const onClickLoginButton = async() => {
    try{
      if(!(email && password && role)) {
        // Show error
        return;
      }
      const { data, status } = await axiosHelperCall('POST', `${CONFIG.APP_URL}/user/create`, {
        email: email,
        password: password,
        uloga: role
      }, {});
      // Show creation message
      if(status === 200) history.push(routes.USERS);
    } catch(e){
      console.log('TAG-ERROR','FAILED REQUEST AT CreateUser.jsx');
    }
  }

  return (
    <div className='create-user-container'>
      <h1>Add new user</h1>
      <label className='create-user-label'>Enter user email:</label>
      <InputComponent 
        type="email"
        value={email}
        onChange={onChangeEmail}
      />
      <label className='create-user-label'>Enter user password:</label>
      <InputComponent 
        type="password"
        value={password}
        onChange={onChangePassword}
      />
      <label className='create-user-label'>Enter user role:</label>
      <br/>
      <DropDown 
        optionsList={optionsList}
        value={role}
        onChange={onChangeSelect}
      />
      <InputComponent className='create-button'
          type='button'
          onClick={onClickLoginButton}
          value='Submit'
      />
    </div>
  );
}

export default CreateUser;
