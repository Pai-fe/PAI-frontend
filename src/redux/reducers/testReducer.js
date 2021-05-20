import { UPDATE_TEST } from "../actions/testActions";

const test = (
  state = {
    counter: 0
  },
  { type, payload }
) => {
  switch (type) {
    case UPDATE_TEST:
      return {
        ...state,
        counter: payload
      };
    default:
      return state;
  }
};

export default test;