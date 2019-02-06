import React from 'react';
import PropTypes from 'prop-types';

import LabeledText from './LabeledText';

const parseDateToString = (dateString) => {
  const date = new Date(dateString);
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
};

const parseAddressToString = (addressObject) => {
  const {
    address,
    city,
    state,
    zip,
  } = addressObject;

  return `${address}, ${city}. ${state}, ${zip}`;
};

const PatientDetails = ({ patient }) => {
  return (
    <div className="patient-details">
      <LabeledText label="DOB" value={parseDateToString(patient.dateOfBirth)} />
      <LabeledText label="Email address" value={patient.email} />
      <LabeledText label="Phone" value={patient.phoneNumber} />
      { patient.address && <LabeledText label="Address" value={parseAddressToString(patient.address[0])} /> }
    </div>
  );
};

PatientDetails.propTypes = {
  patient: PropTypes.object,
};

export default PatientDetails;
