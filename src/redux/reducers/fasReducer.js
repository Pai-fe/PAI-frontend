import { SET_FAS } from "../actions/fasActions";

const fas = (
  state = {
    list: []
  },
  { type, payload }
) => {
  switch (type) {
    case SET_FAS:
      return {
        ...state,
        list: [...payload]
      };
    default:
      return state;
  }
};

export default fas;