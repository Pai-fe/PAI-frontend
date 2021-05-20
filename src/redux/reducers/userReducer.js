import { GET_ME } from "../actions/userActions";

const user = (
  state = {
    user: {},
    me: {}
  },
  { type, payload }
) => {
  switch (type) {
    case GET_ME:
      return {
        ...state,
        me: payload
      };
    default:
      return state;
  }
};

export default user;