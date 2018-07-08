import React from 'react';
//import './TableContainer.css';
import RcTable from 'rc-table';
import PropTypes from 'prop-types';
import 'rc-table/assets/index.css';

const Table = ({ columns, data, title}) => {
  return (
    <div className="Table">
      <RcTable
        columns={columns}
        data={data}
        title={title}/>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.func,
};

Table.defaultProps = {
  title: () => {},
};

export default Table;