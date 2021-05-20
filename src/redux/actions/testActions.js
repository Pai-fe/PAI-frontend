export const UPDATE_TEST = "UPDATE_TEST";

export const updateTest = counter => ({
  type: UPDATE_TEST,
  payload: {
    counter
  }
});
