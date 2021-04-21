import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  UPDATE_SPOTS
} from "../reducers/application";

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, value: day });

  useEffect(() => {

    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    webSocket.onopen = function() {
      webSocket.send("ping");
    };

    webSocket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      if (data.type) {
        dispatch(data);
      }
    };

    const API = {
      GET_DAYS: "/api/days",
      GET_APPOINTMENTS: "/api/appointments",
      GET_INTERVIEWERS: "/api/interviewers",
    };

    Promise.all([
      axios.get(API.GET_DAYS),
      axios.get(API.GET_APPOINTMENTS),
      axios.get(API.GET_INTERVIEWERS)
    ])
      .then(all => {
        dispatch({ type: SET_APPLICATION_DATA, value: all });
      });

  }, []);

  const bookInterview = (id, interview, callback, resParam, errParam) => {
    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };
    axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: appointments });
      })
      .then(() => {
        dispatch({ type: UPDATE_SPOTS });
        callback(resParam); // transition(SHOW)
      })
      .catch(err => {
        console.error(err);
        callback(errParam, true); // transition(ERROR_SAVE, true)
      });
  };

  const cancelInterview = (id, callback, resParam, errParam) => {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: appointments });
      })
      .then(() => {
        dispatch({ type: UPDATE_SPOTS });
        callback(resParam); // transition(SHOW)
      })
      .catch(err => {
        console.error(err);
        callback(errParam, true); // transition(ERROR_DELETE, true)
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

}