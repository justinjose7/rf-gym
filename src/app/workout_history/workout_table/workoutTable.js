import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';


const StyledTableCell = withStyles({
  root: {
    color: 'white',
    padding: '0 30px',
    textAlign: 'left',
  },
})(TableCell);

const styles = () => ({
  paper: {
    margin: '5px',
    position: 'relative',
    borderRadius: '5px',
    background: '#111',
    boxShadow: '0 0 35px black',
    opacity: '0.9',
  },
});

const WorkoutTable = ({ data, classes }) => (
  <div>
    <MuiThemeProvider>
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell numeric>Equipment Name</StyledTableCell>
              <StyledTableCell numeric>Date</StyledTableCell>
              <StyledTableCell numeric>Time Used</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0, data.length).map((n, key) => (
              <TableRow key={key}>
                <StyledTableCell numeric>{n.equipmentName}</StyledTableCell>
                <StyledTableCell numeric>{n.useDate}</StyledTableCell>
                <StyledTableCell>
                  {Math.floor(n.minutesUsed)}
                  {' '}
minutes
                  {' '}
                  {Math.floor(n.minutesUsed * 60 % 60)}
                  {' '}
seconds
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </MuiThemeProvider>
  </div>
);

WorkoutTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    equipmentName: PropTypes.string.isRequired,
    inDate: PropTypes.string.isRequired,
    totalTime: PropTypes.number.isRequired,
  })),
  classes: PropTypes.object.isRequired,
};

WorkoutTable.defaultProps = {
  data: [{
    equipmentName: '',
    inDate: '',
    totalTime: 0,
  }],
};

export default withStyles(styles)(WorkoutTable);
