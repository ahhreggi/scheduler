export function getAppointmentsForDay(state, day) {

  // Retrieve the data for the given day from state.days
  const dayData = state.days.filter(dayObj => dayObj.name === day);
  // If there is no data for the given day, return an empty array
  if (!dayData.length) {
    return [];
  }
  // Retrieve the array of appointment IDs from the day data
  const appIDs = dayData[0].appointments;
  // Return an array of appointments from state.appointments with the IDs in appIDs
  return appIDs.map(id => state.appointments[id]);

}

export function getInterviewersForDay(state, day) {

  // Retrieve the data for the given day from state.days
  const dayData = state.days.filter(dayObj => dayObj.name === day);
  // If there is no data for the given day, return an empty array
  if (!dayData.length) {
    return [];
  }
  // Retrieve the array of interviewer IDs from the day data
  const interviewerIDs = dayData[0].interviewers;
  // Return an array of interviewers from state.interviewers with the IDs in interviewerIDs
  return interviewerIDs.map(id => state.interviewers[id]);

}

export function getInterview(state, interview) {

  // If there is no data for the given interview, return null
  if (!interview) {
    return null;
  }
  // Return a new interview object with the interviewer object from state.interviewers
  const newInterview = {
    ...interview,
    interviewer: {...state.interviewers[interview.interviewer]}
  };
  return newInterview;

}