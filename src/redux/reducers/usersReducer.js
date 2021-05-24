import { SET_USERS } from "../actions/usersActions";

const users = (
  state = {
    list: []
  },
  { type, payload }
) => {
  switch (type) {
    case SET_USERS:
      return {
        ...state,
        list: [...payload]
      };
    default:
      return state;
  }
};

export default users;