import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import './UpdatePropertyForm.css';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
    </div>
    {touched && error && <span>{error}</span>}
  </div>
);

const submitFunction = (updateProperty, id) => {
  return (formValues) => updateProperty(id, formValues);
};

const UpdatePropertyForm = props => {
  const { error, handleSubmit, submitting, updateProperty, initialValues } = props;
  return (
    <form onSubmit={handleSubmit(submitFunction(updateProperty, initialValues.id))} className='PropertyForm'>
      <Field
        name="owner"
        type="text"
        component={renderField}
        label="Host"
      />
      <Field
        name="address.line1"
        type="text"
        component={renderField}
        label="Line 1"
      />
      <Field
        name="address.line2"
        type="text"
        component={renderField}
        label="Line 2"
      />
      <Field
        name="address.line3"
        type="text"
        component={renderField}
        label="Line 3"
      />
      <Field
        name="address.line4"
        type="text"
        component={renderField}
        label="Line 4"
      />
      <Field
        name="address.postCode"
        type="text"
        component={renderField}
        label="Post Code"
      />
      <Field
        name="address.city"
        type="text"
        component={renderField}
        label="City"
      />
      <Field
        name="address.country"
        type="text"
        component={renderField}
        label="Country"
      />
      <Field
        name="numberOfBedrooms"
        type="number"
        component={renderField}
        label="Number of Bedrooms"
      />
      <Field
        name="numberOfBathrooms"
        type="number"
        component={renderField}
        label="Number of Bathrooms"
      />
      <Field
        name="airbnbId"
        type="text"
        component={renderField}
        label="Airbnb ID"
      />
      <Field
        name="incomeGenerated"
        type="text"
        component={renderField}
        label="Income Generated"
      />
      {error && <strong>{error}</strong>}
      <div>
        <button type="submit" disabled={submitting}>
          Update
        </button>
      </div>
    </form>
  );
};

UpdatePropertyForm.propTypes = {
  updateProperty: PropTypes.func,
  initialValues: PropTypes.object,
};

export default reduxForm({
  form: 'updateProperty'
})(UpdatePropertyForm);