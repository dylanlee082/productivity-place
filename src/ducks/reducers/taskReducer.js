import axios from "axios";

let initialState = {
  task: {},
  taskList: [],
  updateTaskToggle: false
};

const GET_TASK = "GET_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const UPDATE_TASK_TOGGLE = "UPDATE_TASK_TOGGLE";

export const getTask = id => {
  return {
    type: GET_TASK,
    payload: axios.get(`/api/task/${id}`)
  };
};

export const updateTask = task => {
  return {
    type: UPDATE_TASK,
    payload: task
  };
};

export const updateTaskToggle = open => {
  return {
    type: UPDATE_TASK_TOGGLE,
    payload: open
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_TASK}_FULFILLED`:
      return { ...state, taskList: action.payload.data };
    case UPDATE_TASK:
      return {
        ...state,
        task: action.payload
      };
    case UPDATE_TASK_TOGGLE:
      return { ...state, updateTaskToggle: !action.payload };
    default:
      return state;
  }
}
