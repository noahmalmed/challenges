import React from 'react';
import PropTypes from 'prop-types';

import Appointment from './Appointment';

const Appointments = ({ appointments, type }) => (
  <div>
    {
      appointments.length === 0 ?
        <p> { `You have no ${type} appointments` } </p>
      :
        appointments.map((appt) => <Appointment key={appt.id} appt={appt} />)
    }
  </div>
);

Appointments.propTypes = {
  appointments: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.oneOf(['upcoming', 'pending', 'past']),
};

export default Appointments;
