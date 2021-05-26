import React, { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import { axiosHelperCall } from '../../helpers/axios.helper';
import { CONFIG } from '../../helpers/config';
import { GET_ME, updateUser } from '../../redux/actions/userActions';
import User from '../Pages/User';
import Login from '../Pages/Login';
import { AUTHENTICATE_OPTIONS } from './AuthenticateOptions';
import { routes } from './RoutesList';
import Users from "../Pages/Users";
import NavBar from "../NavBar/NavBar";
import Home from "../Pages/Home";
import CreateUser from "../Pages/CreateUser";
import FAListView from "../Pages/FAListView";
import FAEditView from "../Pages/FAEditView";
import FACreateView from "../Pages/FACreateView"

function AppRouter() {
  const user = useSelector((state) => state.userInfo.user)
  const dispatch = useDispatch();
  
  const initAction = async() => {
    //TODO: Check if token is there and decide on validity
    if(!user?.uloga){
      try{
        const { data, status } = await axiosHelperCall('GET', `${CONFIG.APP_URL}/user/me`, {}, {})
        if(status !== 200) throw new Error();
        dispatch(updateUser(data.user))
      } catch (e){
        console.log('ERROR - TAG AppRouter.jsx')
      }
    }
  }

  useEffect(() => {
    initAction();
  }, []);
  
  return (
    <>
    <div>
    </div>
    <Router>
      <NavBar user={user} />
      <Switch>
        <Route path={routes.ROOT} exact component={Login} />
        <Route path={routes.HOME} exact component = {Home}/>
        <Route path={routes.USERS} exact component = {Users}/>
        <Route path={routes.CREATE_USER} exact component = {CreateUser}/>
        <Route path={routes.FA_LIST_VIEW} exact component = {FAListView}/>
        <Route path={routes.FA_CREATE_VIEW} exact component = {FACreateView}/>
        <Route path={routes.FA_EDIT_VIEW} exact component = {FAEditView}/>

        <Route render={() => <Redirect to={routes.ROOT} />} />
      </Switch>
    </Router>
    </>
  );
}

export default AppRouter;
