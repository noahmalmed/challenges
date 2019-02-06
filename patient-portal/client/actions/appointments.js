import axios from 'axios';

export const APPOINTMENTS_ACTIONS = {
  CANCEL_APPOINTMENT: 'CANCEL_APPOINTMENT',
  REQUEST_APPOINTMENT_SUCCESS: 'REQUEST_APPOINTMENT_SUCCESS',
  CONFIRM_APPOINTMENT: 'CONFIRM_APPOINTMENT',
  CONFIRM_APPOINTMENT_SUCCESS: 'CONFIRM_APPOINTMENT_SUCCESS',
};

const cancelAppointmentAction = (appointmentId) => ({
  type: APPOINTMENTS_ACTIONS.CANCEL_APPOINTMENT,
  id: appointmentId,
});

const requestAppointmentSuccess = {
  type: APPOINTMENTS_ACTIONS.REQUEST_APPOINTMENT_SUCCESS,
};

const confirmAppointmentSuccess = (appointmentId) => ({
  type: APPOINTMENTS_ACTIONS.CONFIRM_APPOINTMENT_SUCCESS,
  id: appointmentId,
});

export const cancelAppointment = (appointmentId) => (dispatch) => {
  axios.delete(`/api/appointments/${appointmentId}`)
    .then(() => {
      dispatch(cancelAppointmentAction(appointmentId));
    })
    .catch(() => { /* TODO: Implement Some error handling */ });
};

export const addRequestedAppointment = (date, patientId, doctorId, purpose) => (dispatch) =>
  new Promise((resolve) => {
    axios.post(
      '/api/appointments/',
      {
        status: 'pending',
        datetime: date,
        purpose,
        patient_id: patientId,
        doctor_id: doctorId,
      },
    )
      .then(() => {
        dispatch(requestAppointmentSuccess);
        resolve();
      });
  });

export const confirmAppointment = (appointmentId) => (dispatch) =>
  new Promise((resolve) => {
    axios.put(
      `/api/appointments/${appointmentId}`,
      {
        status: 'confirmed',
      },
    )
      .then(() => {
        dispatch(confirmAppointmentSuccess(appointmentId));
        resolve();
      });
  });
