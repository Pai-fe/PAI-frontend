export const GET_ME = "GET_ME";
export const UPDATE_USER = "UPDATE_USER";

export const getMe = value => ({
  type: GET_ME,
  payload: value
});

export const updateUser = value => ({
  type: UPDATE_USER,
  payload: value
});