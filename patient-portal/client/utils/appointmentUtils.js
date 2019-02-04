import moment from 'moment';

export const getUpcomingAppointments = (appointments) =>
  appointments ?
    appointments
      .filter((appointment) => appointment.status === 'confirmed')
      .filter((appointment) => moment(appointment.dateTime).isAfter(new Date().getTime()))
    : [];

export const getPendingAppointments = (appointments) =>
  appointments ?
    appointments
      .filter((appointment) => appointment.status === 'pending')
      .filter((appointment) => moment(appointment.dateTime).isAfter(new Date().getTime()))
    : [];

export const getPastAppointments = (appointments) =>
  appointments ?
    appointments
      .filter((appointment) => appointment.status === 'confirmed')
      .filter((appointment) => moment(appointment.dateTime).isBefore(new Date().getTime()))
    : [];
