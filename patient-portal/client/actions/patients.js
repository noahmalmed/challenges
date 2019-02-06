import axios from 'axios';

export const PATIENT_ACTIONS = {
  PATIENT_DATA_REQUEST: 'PATIENT_DATA_REQUEST',
  PATIENT_DATA_SUCCESS: 'PATIENT_DATA_SUCCESS',
  PATIENT_DATA_ERROR: 'PATIENT_DATA_ERROR',
  ALL_PATIENTS_REQUEST: 'ALL_PATIENTS_REQUEST',
  ALL_PATIENTS_SUCCESS: 'ALL_PATIENTS_SUCCESS',
  ALL_PATIENTS_ERROR: 'PATIENT_DATA_ERROR',
};

const patientDataRequest = {
  type: PATIENT_ACTIONS.PATIENT_DATA_REQUEST,
};

const patientDataSuccess = (data) => ({
  type: PATIENT_ACTIONS.PATIENT_DATA_SUCCESS,
  data,
});

const patientDataError = {
  type: PATIENT_ACTIONS.PATIENT_DATA_ERROR,
};

const allPatientsRequest = {
  type: PATIENT_ACTIONS.ALL_PATIENTS_REQUEST,
};

const allPatientsSuccess = (data) => ({
  type: PATIENT_ACTIONS.ALL_PATIENTS_SUCCESS,
  data,
});

const allPatientsError = {
  type: PATIENT_ACTIONS.ALL_PATIENTS_ERROR,
};

export const getPatientData = (patientId) => (dispatch) => {
  dispatch(patientDataRequest);
  axios.get(`/api/patients/${patientId}`)
    .then((response) => {
      dispatch(patientDataSuccess(response.data));
    })
    .catch(() => {
      dispatch(patientDataError);
    });
};

export const getAllPatients = () => (dispatch) => {
  dispatch(allPatientsRequest);
  axios.get('/api/patients')
    .then((response) => {
      dispatch(allPatientsSuccess(response.data));
    })
    .catch(() => {
      dispatch(allPatientsError);
    });
};
