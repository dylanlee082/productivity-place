import axios from "axios";

let initialState = {
  contact: {},
  contactList: [],
  updateContactToggle: false
};

const GET_CONTACT = "GET_CONTACT";
const UPDATE_CONTACT = "UPDATE_CONTACT";
const UPDATE_CONTACT_TOGGLE = "UPDATE_CONTACT_TOGGLE";

export const getContact = id => {
  return {
    type: GET_CONTACT,
    payload: axios.get(`/api/contact/${id}`)
  };
};

export const updateContact = contact => {
  return {
    type: UPDATE_CONTACT,
    payload: contact
  };
};

export const updateContactToggle = open => {
  return {
    type: UPDATE_CONTACT_TOGGLE,
    payload: open
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_CONTACT}_FULFILLED`:
      return { ...state, contactList: action.payload.data };
    case UPDATE_CONTACT:
      return { ...state, contact: action.payload };
    case UPDATE_CONTACT_TOGGLE:
      return { ...state, updateContactToggle: !action.payload };
    default:
      return state;
  }
}
