import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    const API = {
      GET_DAYS: "http://localhost:8001/api/days",
      GET_APPOINTMENTS: "http://localhost:8001/api/appointments",
      GET_INTERVIEWERS: "http://localhost:8001/api/interviewers",
    }

    Promise.all([
      axios.get(API.GET_DAYS),
      axios.get(API.GET_APPOINTMENTS),
      axios.get(API.GET_INTERVIEWERS)
    ])
      .then(all => {
        const [days, appointments, interviewers] = all.map(e => e.data)
        setState(prev => ({ ...prev, days, appointments, interviewers }))
      })
  }, [])

  const setDay = day => setState(prev => ({ ...prev, day }));

  function bookInterview(id, interview, callback, resParam, errParam) {
    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };
    axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments });
        callback(resParam); // transition(SHOW)
      })
      .catch(err => {
        console.error(err);
        callback(errParam) // transition(ERROR_SAVE)
      });
  }

  function cancelInterview(id, callback, resParam, errParam) {
    const appointment = { ...state.appointments[id], interview: null }
    const appointments = { ...state.appointments, [id]: appointment };
    axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments });
        callback(resParam); // transition(SHOW)
      })
      .catch(err => {
        console.error(err);
        callback(errParam, true) // transition(ERROR_DELETE, true)
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

}