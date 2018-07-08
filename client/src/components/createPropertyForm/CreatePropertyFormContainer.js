import CreatePropertyForm from './CreatePropertyForm';
import createProperty from './createPropertyLib';
import React, { Component } from 'react';

class CreatePropertyFormContainer extends Component {
  render() {
    return (
      <div>
        <CreatePropertyForm createProperty={createProperty}/>
      </div>
    );
  }
}

export default CreatePropertyFormContainer;