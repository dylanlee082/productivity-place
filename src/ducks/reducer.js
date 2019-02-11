let initialState = {
  open: true,
  calendarForm: false
};

const TOGGLE_OPEN = "TOGGLE_OPEN";
const OPEN_CALENDAR_FORM = "TOGGLE_CALENDAR_FORM";

export const toggleOpen = open => {
  return {
    type: TOGGLE_OPEN,
    payload: open
  };
};

export const toggleCalendarForm = calendarForm => {
  return {
    type: OPEN_CALENDAR_FORM,
    payload: calendarForm
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_OPEN:
      return { ...state, open: !action.payload };
    case OPEN_CALENDAR_FORM:
      return { ...state, calendarForm: !action.payload };
    default:
      return state;
  }
}
