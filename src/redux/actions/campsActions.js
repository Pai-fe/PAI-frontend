export const SET_CAMPS = "SET_CAMPS";
export const SET_CAMP = "SET_CAMP";

export const setCamps = arrayOfCamps => ({
  type: SET_CAMPS,
  payload: arrayOfCamps
});

export const setCamp = camp => ({
  type: SET_CAMP,
  payload: camp
});