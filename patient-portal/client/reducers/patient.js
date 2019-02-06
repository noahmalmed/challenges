import { PATIENT_ACTIONS } from '../actions/patients';
import { APPOINTMENTS_ACTIONS } from '../actions/appointments';
import { AUTHENTICATION_ACTIONS } from '../actions/auth';
import _ from 'lodash';

const INITIAL_STATE = {
  isSuccess: false,
  isLoading: false,
  isFail: false,
  data: {},
};

const patientReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PATIENT_ACTIONS.PATIENT_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        data: action.data,
      };
    case PATIENT_ACTIONS.PATIENT_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isFail: false,
      };
    case PATIENT_ACTIONS.PATIENT_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        isFail: true,
      };
    case APPOINTMENTS_ACTIONS.CANCEL_APPOINTMENT:
      return {
        ...state,
        data: {
          ...state.data,
          appointments: state.data.appointments.filter((appointment) => appointment.id !== action.id),
        },
      };
    case APPOINTMENTS_ACTIONS.CONFIRM_APPOINTMENT_SUCCESS:
      return {
        ...state,
        data: {
          appointments: state.data.appointments.map((appointment) => {
            if (appointment.id === action.id) {
              return _.set(appointment, 'status', 'confirmed');
            }

            return appointment;
          }),
        },
      };
    case AUTHENTICATION_ACTIONS.SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default patientReducer;
