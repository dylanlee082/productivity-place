import axios from "axios";

let initialState = {
  appt: {},
  apptList: [],
  updateApptToggle: false
};

const GET_APPT = "GET_APPT";
const UPDATE_APPT = "UPDATE_APPT";
const UPDATE_APPT_TOGGLE = "UPDATE_APPT_TOGGLE";

export const getAppt = id => {
  return {
    type: GET_APPT,
    payload: axios.get(`/api/appt/${id}`)
  };
};

export const updateAppt = appt => {
  return {
    type: UPDATE_APPT,
    payload: appt
  };
};

export const updateApptToggle = open => {
  return {
    type: UPDATE_APPT_TOGGLE,
    payload: open
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_APPT}_FULFILLED`:
      return { ...state, apptList: action.payload.data };
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
    default:
      return state;
  }
}
