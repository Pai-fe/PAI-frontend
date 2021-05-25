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
import { routes } from '../AppRouter/RoutesList';

import './Login.css'


const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const storeToken = useSelector(state => state?.userInfo?.me);

  const [email, setEmail] = useState("ekrsmanovi1@etf.unsa.ba");
  const [password, setPassword] = useState("password");
  const [buttonText] = useState("Login");

  const onChangeEmail = (event) => {
    //Email validation here
    setEmail(event?.target?.value)
  }

  const onChangePassword = (event) => {
    //Password validation here
    setPassword(event?.target?.value)
  }

  const onClickLoginButton = async() => {
    try{
      const { data, status } = await axiosHelperCall('POST', `${CONFIG.APP_URL}/auth/login`, {
        email: email,
        password: password
      }, {});
      if(status !== 200) throw new Error();
      localStorage.setItem(CONFIG.REACT_APP_TOKEN_CODE, `Bearer ${data.token}`);
      dispatch(getMe(data.token));
      // TODO: GET ME HERE (missing endpoint)

      //Dummy data uloga: "User" ili uloga: "User"
      dispatch(updateUser({ 
        email: "ekrsmanovi1@etf.unsa.ba",
        uloga: "Admin"
      }));

      history.push(routes.FA_LIST_VIEW);
    } catch(e){
      console.log('TAG-ERROR','FAILED REQUEST AT Login.jsx');
    }
  }

  const checkIfTokenIsValid = () => {
    const localStorageToken = localStorage.getItem(CONFIG.REACT_APP_TOKEN_CODE)
    console.log(storeToken, localStorageToken, 'Login.jsx missing validation for this token');
    // TODO: GET ME route missing, do this later
  }

  useEffect(() => {
    //On load of the page check if there is Token in localstorage or in store
    checkIfTokenIsValid()
  }, [])

  return (
    <div className='login-div'>
      <h1>LOGIN</h1>
      <InputComponent 
        type="email"
        value={email}
        onChange={onChangeEmail}
      />
      <InputComponent 
        type="password"
        value={password}
        onChange={onChangePassword}
      />
      <LoginButton 
        value={buttonText}
        onClick={onClickLoginButton}
      />
    </div>
  );
}

export default Login;
