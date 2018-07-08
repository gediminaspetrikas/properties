import UpdatePropertyForm from './UpdatePropertyForm';
import updateProperty from './updatePropertyLib';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class UpdatePropertyFormContainer extends Component {
  getProperty() {
    return this.props.properties.find(property => property.id === this.props.match.params.id) || {};
  }

  render() {
    return (
      <div>
        <UpdatePropertyForm updateProperty={updateProperty} initialValues={this.getProperty()}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    properties: state.properties
  };
}

UpdatePropertyFormContainer.propTypes = {
  match: PropTypes.object,
  properties: PropTypes.array,
};

export default withRouter(connect(
  mapStateToProps,
)(UpdatePropertyFormContainer));
