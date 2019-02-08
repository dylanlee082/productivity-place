let initialState = {
  open: true
};

const TOGGLE_OPEN = "TOGGLE_OPEN";

export const toggleOpen = open => {
  return {
    type: TOGGLE_OPEN,
    payload: open
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_OPEN:
      return { ...state, open: !action.payload };
    default:
      return state;
  }
}
