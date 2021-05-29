import { SET_CAMPS, SET_CAMP } from "../actions/campsActions";

const camps = (
  state = {
    list: [],
    camp: null
  },
  { type, payload }
) => {
  switch (type) {
    case SET_CAMPS:
      return {
        ...state,
        list: [...payload]
      };
    case SET_CAMP:
      return {
        ...state,
        camp: payload
      }
    default:
      return state;
  }
};

export default camps;