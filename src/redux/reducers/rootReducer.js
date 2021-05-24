import { combineReducers } from "redux";
import testReducer from './testReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import fasReducer from './fasReducer';

export default combineReducers({
  userInfo: userReducer,
  users: usersReducer,
  test: testReducer,
  fas: fasReducer,
});