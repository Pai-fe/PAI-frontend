import { SET_FAS, SET_FA } from "../actions/fasActions";

const fas = (
  state = {
    list: [],
    fa: null
  },
  { type, payload }
) => {
  switch (type) {
    case SET_FAS:
      return {
        ...state,
        list: [...payload]
      };
    case SET_FA:
      return {
        ...state,
        fa: payload
      }
    default:
      return state;
  }
};

export default fas;