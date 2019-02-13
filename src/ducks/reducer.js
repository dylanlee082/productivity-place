import axios from "axios";

let initialState = {
  open: true,
  user: {},
  contacts: [],
  tasks: [],
  appts: []
};

const TOGGLE_OPEN = "TOGGLE_OPEN";
const GET_USER = "GET_USER";
const GET_CONTACT = "GET_CONTACT";
const GET_TASK = "GET_TASK";
const GET_APPT = "GET_APPT";

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

export const getContact = id => {
  return {
    type: GET_CONTACT,
    payload: axios.get(`/api/contact/${id}`)
  };
};

export const getTask = id => {
  return {
    type: GET_TASK,
    payload: axios.get(`/api/task/${id}`)
  };
};

export const getAppt = id => {
  return {
    type: GET_APPT,
    payload: axios.get(`/api/appt/${id}`)
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_APPT}_FULFILLED`:
      return { ...state, appts: action.payload.data };
    case `${GET_TASK}_FULFILLED`:
      return { ...state, tasks: action.payload.data };
    case `${GET_CONTACT}_FULFILLED`:
      return { ...state, contacts: action.payload.data };
    case `${GET_USER}_FULFILLED`:
      return { ...state, user: action.payload.data };
    case TOGGLE_OPEN:
      return { ...state, open: !action.payload };
    default:
      return state;
  }
}
