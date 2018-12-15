import io from 'socket.io-client';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { loadInitialData, listenForUpdates } from './actions';

const StyledTableCell = withStyles({
  root: {
    color: 'white',
    padding: '0 30px',
    textAlign: 'left',
  },
})(TableCell);

const StyledPaper = withStyles({
  root: {
    position: 'relative',
    margin: '5px',
    borderRadius: '5px',
    background: '#111',
    boxShadow: '0 0 35px black',
    opacity: '0.9',
  },
})(Paper);

let socket;

class EquipmentTable extends Component {
  componentDidMount() {
    socket = io.connect('/');
    socket.on('error', (err) => {
      console.log(err);
    });
    const { loadInitialData } = this.props;
    loadInitialData(socket);
    // listenForUpdates(socket);
  }


  componentWillUnmount() {
    socket.disconnect();
  }

  render() {
    console.log(this.props);
    const { data } = this.props;
    return (
      <div>
        <MuiThemeProvider>
          <StyledPaper>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell numeric>Equipment Name</StyledTableCell>
                  <StyledTableCell numeric>Equipment Id</StyledTableCell>
                  <StyledTableCell numeric>Status</StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(0, data.length).map((n, key) => (
                  <TableRow key={key}>
                    <StyledTableCell numeric>{n.equipmentName}</StyledTableCell>
                    <StyledTableCell numeric>{n.equipmentId}</StyledTableCell>
                    <StyledTableCell>{n.inUse ? 'Busy' : 'Available'}</StyledTableCell>
                    {/* <StyledTableCell numeric>
                      {(new Date(n.outTime).getTime() - new Date(n.inTime).getTime()) / (1000 * 60)}
                    </StyledTableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledPaper>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.equipment_status.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadInitialData,
  listenForUpdates,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentTable);
