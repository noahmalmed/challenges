import axios from 'axios';

export const DOCTOR_ACTIONS = {
  REQUEST_DOCTORS: 'REQUEST_DOCTORS',
  REQUEST_DOCTORS_SUCCESS: 'REQUEST_DOCTORS_SUCCESS',
  REQUEST_DOCTORS_FAIL: 'REQUEST_DOCTORS_FAIL',
};

const requestDoctors = {
  type: DOCTOR_ACTIONS.REQUEST_DOCTORS,
};

const requestDoctorsSuccess = (doctors) => ({
  type: DOCTOR_ACTIONS.REQUEST_DOCTORS_SUCCESS,
  doctors,
});

const requestDoctorsFail = {
  type: DOCTOR_ACTIONS.REQUEST_DOCTORS_FAIL,
};

export const getDoctors = () => (dispatch) => {
  dispatch(requestDoctors);
  axios.get('api/doctors/')
    .then((res) => {
      dispatch(requestDoctorsSuccess(res.data));
    })
    .catch(dispatch(requestDoctorsFail));
};

