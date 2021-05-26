import { GET_ME, UPDATE_USER } from "../actions/userActions";

const user = (
  state = {
    user: {},
    me: null,
  },
  { type, payload }
) => {
  switch (type) {
    case GET_ME:
      return {
        ...state,
        me: payload
      };
    case UPDATE_USER:
      return {
        ...state,
        user: payload
      };
    default:
      return state;
  }
};

export default user;