export const GET_ME = "GET_ME";

export const getMe = user => ({
  type: GET_ME,
  payload: {
    user
  }
});
