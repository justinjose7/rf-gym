import io from 'socket.io-client';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { loadInitialData, listenForUpdates } from './actions';
import './index.css'

const StyledTableCell = withStyles({
  root: {
    color: 'white',
    padding: '0 30px',
  },
})(TableCell);

const StyledPaper = withStyles({
  root: {
    right: '100%',
    // marginTop: '15px',
    // marginLeft: '15px',
    borderRadius: '5px',
    background: '#222',
    width: '40%',
    opacity: '0.9',
  },
})(Paper);

let socket

class EquipmentTable extends React.Component{
  constructor(props) {
    super(props)
    socket = io.connect('/')
    socket.on('error', (err) => {
      console.log(err);
    });
    this.props.loadInitialData(socket)
  }

  componentWillMount() {
    this.props.listenForUpdates(socket);
  }

  componentWillUnmount() {
    socket.disconnect()
  }

  render() {
    const {data} = this.props.default_home
    return (
      <MuiThemeProvider>
        <StyledPaper id ="table">
          <Table>
            <TableHead>
              <TableRow id ="table">
                <StyledTableCell>Member Name</StyledTableCell>
                <StyledTableCell numeric>Member Id</StyledTableCell>
                <StyledTableCell numeric>Date started</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0,10).map((n, key) => {
                return (
                  <TableRow key={key} id ="table">
                    <StyledTableCell component="th" scope="row">{n.member_name}</StyledTableCell>
                    <StyledTableCell numeric>{n.member_id}</StyledTableCell>
                    <StyledTableCell numeric>{n.date_started}</StyledTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </StyledPaper>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {...state};
};

export default connect(mapStateToProps, {loadInitialData, listenForUpdates})(EquipmentTable);
