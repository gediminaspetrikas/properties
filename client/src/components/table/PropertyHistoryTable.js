import React, { Component } from 'react';
//import './TableContainer.css';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as propertiesActions from '../../actions/propertiesActions';
import Table from './Table';

const columns = [{
  title: 'Host', dataIndex: 'owner', key: 'owner',
}, {
  title: 'Address', dataIndex: 'addressCell', key: 'addressCell',
  render: (lines = []) => lines.map(line => <span>{line}<br /></span>)
}, {
  title: 'Income', dataIndex: 'incomeGenerated', key: 'incomeGenerated',
}, {
  title: 'Airbnb ID', dataIndex: 'airbnbId', key: 'airbnbId',
}, {
  title: 'No of bedrooms', dataIndex: 'numberOfBedrooms', key: 'numberOfBedrooms',
}, {
  title: 'No of bathrooms', dataIndex: 'numberOfBathrooms', key: 'numberOfBathrooms',
}];

class PropertyHistoryTable extends Component {
  componentWillMount() {
    this.props.propertiesActions.fetchPropertyHistory(this.props.match.params.id);
  }

  render() {
    return (
      <div className="Table">
        <Table
          columns={columns}
          data={this.props.propertyHistory}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    propertyHistory: state.propertyHistory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    propertiesActions: bindActionCreators(propertiesActions, dispatch)
  };
}


PropertyHistoryTable.propTypes = {
  propertiesActions: PropTypes.object,
  propertyHistory: PropTypes.array,
  match: PropTypes.object,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyHistoryTable));
