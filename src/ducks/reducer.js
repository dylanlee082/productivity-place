import axios from "axios";

let initialState = {
  open: true,
  user: {}
};

const TOGGLE_OPEN = "TOGGLE_OPEN";
const GET_USER = "GET_USER";

export const toggleOpen = open => {
  return {
    type: TOGGLE_OPEN,
    payload: open
  };
};

export const getUser = () => {
  return {
    type: GET_USER,
    payload: axios.get("/auth/user")
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return { ...state, user: action.payload.data };
    case TOGGLE_OPEN:
      return { ...state, open: !action.payload };
    default:
      return state;
  }
}
