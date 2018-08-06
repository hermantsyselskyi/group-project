import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { triggerLogout } from '../../redux/actions/loginActions';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import RoomInfoModal from '../../components/RoomInfoModal/RoomInfoModal';


const mapStateToProps = state => ({
  request: state.request,
});
class ResidentialTableRow extends Component {

  render() {
    return (
      <TableRow>
          {/* <pre>{JSON.stringify(this.props.rowData.request_info)}</pre> */}
          <TableCell>{ this.props.rowData.request_info.request_id }</TableCell>
          <TableCell>{ this.props.rowData.contact_info.first_name  } {this.props.rowData.contact_info.last_name}</TableCell>
          <TableCell>{ this.props.rowData.contact_info.email }</TableCell>
          <TableCell>{ this.props.rowData.request_info.est_duration}</TableCell>
          <TableCell>{ this.props.rowData.request_info.service_type }</TableCell>
          <TableCell><RoomInfoModal/></TableCell>
          <TableCell>{ this.props.rowData.request_info.start_time } { this.props.rowData.request_info.end_time }</TableCell>
          <TableCell>{ this.props.rowData.request_info.status }</TableCell>
      </TableRow>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ResidentialTableRow);