export function getAppointmentsForDay(state, day) {
  // Retrieve the data for the given day from state.days
  const dayData = state.days.filter(dayObj => dayObj.name === day)
  // If there is no data for the given day, return an empty array
  if (!dayData.length) {
    return [];
  }
  // Retrieve the array of appointment IDs from the day data
  const appIDs = dayData[0].appointments;
  // Return an array of appointments from state.appointments with the IDs in appIDs
  return appIDs.map(id => state.appointments[id])
}