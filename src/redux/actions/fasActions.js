export const SET_FAS = "SET_FAS";
export const SET_FA = "SET_FA";

export const setFAs = arrayOfFas => ({
  type: SET_FAS,
  payload: arrayOfFas
});

export const setFA = fa => ({
  type: SET_FA,
  payload: fa
});