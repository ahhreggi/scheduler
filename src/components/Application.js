import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment"

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors";

const API = {
  GET_DAYS: "http://localhost:8001/api/days",
  GET_APPOINTMENTS: "http://localhost:8001/api/appointments",
  GET_INTERVIEWERS: "http://localhost:8001/api/interviewers",
}

export default function Application(props) {

  function bookInterview(id, interview) {
    console.log(id, interview);
  }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });

  useEffect(() => {
    Promise.all([
      axios.get(API.GET_DAYS),
      axios.get(API.GET_APPOINTMENTS),
      axios.get(API.GET_INTERVIEWERS)
    ])
      .then(all => {
        const [days, appointments, interviewers] = all.map(e => e.data)
        setState(prev => ({ ...prev, days, appointments, interviewers }))
        console.log(state.interviewers);
      })
  }, [])

  const setDay = day => setState(prev => ({ ...prev, day }));

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
