import React, { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import { axiosHelperCall } from '../../helpers/axios.helper';
import { CONFIG } from '../../helpers/config';
import { GET_ME } from '../../redux/actions/userActions';
import User from '../Pages/User';
import Login from '../Pages/Login';
import { AUTHENTICATE_OPTIONS } from './AuthenticateOptions';
import { routes } from './RoutesList';
import Users from "../Pages/Users";
import NavBar from "../NavBar/NavBar";
import Home from "../Pages/Home";
import CreateUserForm from '../Users/CreateUserForm';
import FAIndex from '../FA/faindex';
import CreateFAForm from '../FA/facreate';
import CreateUser from "../Pages/CreateUser";
import FAListView from "../Pages/FAListView";
import FAEditView from "../Pages/FAEditView";
import FACreateView from "../Pages/FACreateView"

function AppRouter() {
  const [authenticated, setAuthenticated] = useState(AUTHENTICATE_OPTIONS.NULL);
  const me = useSelector((state) => state.userInfo.me)
  const dispatch = useDispatch();
  
  useEffect(() => {
    const initAction = async() => {
      //TODO: Check if token is there and decide on validity

      // try{
      //   const { data, status } = await axiosHelperCall('GET', `${CONFIG.APP_URL}/todos/1`, {}, {})
      //   if(status !== 200) throw new Error();
      //   dispatch({type: GET_ME, payload: {...data}})
      //   setAuthenticated(AUTHENTICATE_OPTIONS.AUTHENTICATED)
      // } catch (e){
      //   setAuthenticated(AUTHENTICATE_OPTIONS.NOT_AUTHENTICATED)
      // }
      setAuthenticated(AUTHENTICATE_OPTIONS.NOT_AUTHENTICATED)
    }
    initAction();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  if (authenticated === AUTHENTICATE_OPTIONS.NULL) {
    return null;
  }
  return (
    <>
    <div>
    </div>
    <Router>
      <NavBar/>
      {authenticated === AUTHENTICATE_OPTIONS.NOT_AUTHENTICATED && (
        <Switch>
          <Route path='/users' exact component = {Users}/>
          <Route path='/adduser' exact component = {CreateUserForm}/>
          <Route path='/fa' exact component = {FAIndex}/>
          <Route path='/fa/create' exact component = {CreateFAForm}/>
          <Route path='/fa/edit/:id' exact component = {CreateFAForm}/>
          <Route path='/edituser/:id/:email' exact component = {CreateUserForm}/>


          <Route path='/' component = {Home}/>
          <Route path={routes.USERS} exact component = {Users}/>
          <Route path='/' exact component = {Home}/>
          <Route path={routes.LOGIN} exact component={Login} />
          <Route path={routes.CREATE_USER} exact component = {CreateUser}/>
          <Route path={routes.FA_LIST_VIEW} exact component = {FAListView}/>
          <Route path={routes.FA_CREATE_VIEW} exact component = {FACreateView}/>
          <Route path={routes.FA_EDIT_VIEW} exact component = {FAEditView}/>
          // ispitati je li Admin ili User, ako je rola Admin redirectati na Admin, else User. Izvuci to iz "me"
          // NOTE: liniju 44 treba izbrisati cim se zavrsi login, trenutno je tu zbog lakseg developanja, ali inace treba biti u not authenticated
          <Route path={routes.ROOT} exact component={User} />
          <Route render={() => <Redirect to={routes.USERS} />} />
        </Switch>
      )}
      {authenticated === AUTHENTICATE_OPTIONS.AUTHENTICATED && (
        <Switch>
        // ispitati je li Admin ili User, ako je rola Admin redirectati na Admin, else User. Izvuci to iz "me"
          <Route path={routes.ROOT} exact component={User} />
          <Route render={() => <Redirect to={routes.ROOT} />} />
          <Route path={routes.USERS} exact component = {Users}/>
          <Route path={routes.HOME} component = {Home}/>
        </Switch>
      )}
    </Router>
    </>
  );
}

export default AppRouter;
