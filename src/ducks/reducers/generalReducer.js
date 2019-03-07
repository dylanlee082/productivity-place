import axios from "axios";

let initialState = {
  loginForm: false,
  settings: {},
  user: {},
  open: true
};

const TOGGLE_OPEN = "TOGGLE_OPEN";
const GET_SETTINGS = "GET_SETTINGS";
const GET_USER = "GET_USER";
const LOGIN_FORM_TOGGLE = "LOGIN_FORM_TOGGLE";

export const toggleOpen = open => {
  return {
    type: TOGGLE_OPEN,
    payload: open
  };
};

export const loginFormToggle = open => {
  return {
    type: LOGIN_FORM_TOGGLE,
    payload: open
  };
};

export const getUser = () => {
  return {
    type: GET_USER,
    payload: axios.get("/auth/user")
  };
};

export const getSettings = id => {
  return {
    type: GET_SETTINGS,
    payload: axios.get(`/api/settings/${id}`)
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_FORM_TOGGLE:
      return {
        ...state,
        loginForm: !action.payload
      };
    case `${GET_SETTINGS}_FULFILLED`:
      return { ...state, settings: action.payload.data };
    case TOGGLE_OPEN:
      return { ...state, open: !action.payload };
    case `${GET_USER}_FULFILLED`:
      return { ...state, user: action.payload.data };
    default:
      return state;
  }
}
