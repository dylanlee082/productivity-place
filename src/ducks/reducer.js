import axios from "axios";

let initialState = {
  open: true,
  user: {},
  appt: {},
  apptList: [],
  updateApptToggle: false,
  contact: {},
  contactList: [],
  updateContactToggle: false,
  task: {},
  taskList: [],
  updateTaskToggle: false
};

const TOGGLE_OPEN = "TOGGLE_OPEN";
const GET_USER = "GET_USER";
const GET_CONTACT = "GET_CONTACT";
const GET_TASK = "GET_TASK";
const GET_APPT = "GET_APPT";
const UPDATE_APPT = "UPDATE_APPT";
const UPDATE_APPT_TOGGLE = "UPDATE_APPT_TOGGLE";
const UPDATE_TASK = "UPDATE_TASK";
const UPDATE_TASK_TOGGLE = "UPDATE_TASK_TOGGLE";
const UPDATE_CONTACT = "UPDATE_CONTACT";
const UPDATE_CONTACT_TOGGLE = "UPDATE_CONTACT_TOGGLE";

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

export const updateApptToggle = open => {
  return {
    type: UPDATE_APPT_TOGGLE,
    payload: open
  };
};

export const updateAppt = appt => {
  return {
    type: UPDATE_APPT,
    payload: appt
  };
};

export const updateTaskToggle = open => {
  return {
    type: UPDATE_TASK_TOGGLE,
    payload: open
  };
};

export const updateTask = task => {
  return {
    type: UPDATE_TASK,
    payload: task
  };
};

export const updateContactToggle = open => {
  return {
    type: UPDATE_CONTACT_TOGGLE,
    payload: open
  };
};

export const updateContact = contact => {
  return {
    type: UPDATE_CONTACT,
    payload: contact
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_APPT:
      return {
        ...state,
        appt: action.payload
      };
    case UPDATE_APPT_TOGGLE:
      return {
        ...state,
        updateApptToggle: !action.payload
      };
    case UPDATE_TASK:
      return {
        ...state,
        task: action.payload
      };
    case UPDATE_TASK_TOGGLE:
      return { ...state, updateTaskToggle: !action.payload };
    case UPDATE_CONTACT:
      return { ...state, contact: action.payload };
    case UPDATE_CONTACT_TOGGLE:
      return { ...state, updateContactToggle: !action.payload };
    case `${GET_APPT}_FULFILLED`:
      return { ...state, apptList: action.payload.data };
    case `${GET_TASK}_FULFILLED`:
      return { ...state, taskList: action.payload.data };
    case `${GET_CONTACT}_FULFILLED`:
      return { ...state, contactList: action.payload.data };
    case `${GET_USER}_FULFILLED`:
      return { ...state, user: action.payload.data };
    case TOGGLE_OPEN:
      return { ...state, open: !action.payload };
    default:
      return state;
  }
}
