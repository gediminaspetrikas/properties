import React, { Component } from 'react';
import './PropertiesTable.css';
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as propertiesActions from '../../actions/propertiesActions';
import Table from './Table';

class PropertiesTable extends Component {
  componentWillMount() {
    this.props.propertiesActions.fetchProperties();
  }

  getColumns() {
    return [{
      title: 'Host', dataIndex: 'owner', key: 'owner',
    }, {
      title: 'Address',
      dataIndex: 'addressCell',
      key: 'addressCell',
      render: (lines = []) => lines.map(line => <span>{line}<br /></span>)
    }, {
      title: 'Income', dataIndex: 'incomeGenerated', key: 'incomeGenerated',
    }, {
      title: 'Airbnb ID', dataIndex: 'airbnbId', key: 'airbnbId',
    }, {
      title: 'No of bedrooms', dataIndex: 'numberOfBedrooms', key: 'numberOfBedrooms',
    }, {
      title: 'No of bathrooms', dataIndex: 'numberOfBathrooms', key: 'numberOfBathrooms',
    }, {
      title: 'Operations',
      dataIndex: '',
      key: 'operations',
      render: (property) => (<div>
        <Link to={`/properties/${property.id}/edit`} className="operation">Edit</Link>
        <Link to={`/properties/${property.id}`} className="operation">History</Link>
        <a className="operation"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            return this.props.propertiesActions.deleteProperty(property.id);
          }}>Delete</a>
      </div>),
    }]
  };

  render() {
    return (
      <div className="Table">
        <Table
          columns={this.getColumns()}
          data={this.props.properties}
          title={() => <Link to='/create'>Create</Link>} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    properties: state.properties
  };
}

function mapDispatchToProps(dispatch) {
  return {
    propertiesActions: bindActionCreators(propertiesActions, dispatch)
  };
}

PropertiesTable.propTypes = {
  propertiesActions: PropTypes.object,
  properties: PropTypes.array,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertiesTable));
