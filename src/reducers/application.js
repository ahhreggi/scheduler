export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const UPDATE_INTERVIEW = "UPDATE_INTERVIEW";
export const UPDATE_SPOTS = "UPDATE_SPOTS";

export default function reducer(state, action) {

  // Update the number of spots for the given state
  const updateSpots = (state) => {
    let spots = 0;
    for (const day in state.days) { /* eslint-disable-line */
      if (state.days[day].name === state.day) {
        for (const id of state.days[day].appointments) {  /* eslint-disable-line */
          if (state.appointments[id].interview === null) {
            spots++;
          }
        }
      }
    }
    // If the day is the current day, update spots, otherwise leave it unchanged
    return state.days.map(day => day.name === state.day ? { ...day, spots } : day);
  };

  switch (action.type) {
  case SET_DAY:
    return { ...state, day: action.value };
  case SET_APPLICATION_DATA: {
    const days = action.value[0].data;
    const appointments = action.value[1].data;
    const interviewers = action.value[2].data;
    return { ...state, days, appointments, interviewers };
  }
  case SET_INTERVIEW: {
    let appointments = { ...state.appointments };
    // If a value is provided, replace appointments with the updated appointments object
    if (action.value) {
      appointments = action.value;
      // Otherwise, if an interview id is provided, update its interview
    } else if (action.id) {
      appointments[action.id].interview = action.interview;
    }
    return { ...state, appointments, days: updateSpots(state) };
  }
  case UPDATE_INTERVIEW: {
    const newAppointment = {
      ...state.appointments[action.value.id],
      interview: action.value.interview
    };
    const newAppointments = {
      ...state.appointments,
      [action.value.id]: newAppointment
    };
    return { ...state, appointments: newAppointments };
  }
  case UPDATE_SPOTS:
    return { ...state, days: updateSpots(state) };
  default:
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  }

}
