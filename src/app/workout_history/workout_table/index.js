import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.css';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import WorkoutTable from './workoutTable';
import { getMemberHistory } from './actions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginTop: 0,

  },
  formControl: {
    margin: theme.spacing.unit,
    marginTop: 0,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});


class WorkoutTableContainer extends Component {
  state = {
    timePeriod: 'week',
  }

  componentDidMount() {
    const { getMemberHistory, user } = this.props;
    if (user) {
      getMemberHistory({ userId: user.userId, equipmentName: '', timePeriod: 'week' });
    }
  }

  handleChange = (event) => {
    const { getMemberHistory, user } = this.props;
    this.setState({ [event.target.name]: event.target.value },
      () => getMemberHistory({ userId: user.userId, equipmentName: '', timePeriod: this.state.timePeriod }));
  };

  render() {
    const {
      getMemberHistory, user, data, classes,
    } = this.props;
    const { timePeriod } = this.state;

    if (user) {
      return (
        <div>
          <TextField
            className={classes.textField}
            type="text"
            placeholder="Filter equipment"
            inputRef={input => this.equipmentQuery = input}
            onChange={() => getMemberHistory({ userId: user.userId, equipmentName: this.equipmentQuery.value, timePeriod })}
          />
          <FormControl className={classes.formControl}>
            <Select
              value={timePeriod}
              onChange={this.handleChange}
              displayEmpty
              name="timePeriod"
              className={classes.selectEmpty}
            >
              <MenuItem value="day">Past Day</MenuItem>
              <MenuItem value="week">Past Week</MenuItem>
              <MenuItem value="month">Past Month</MenuItem>
            </Select>
          </FormControl>
          <WorkoutTable data={data} />
        </div>
      );
    }
    return <p>Loading</p>;
  }
}

const mapStateToProps = state => ({
  user: state.login_details.data,
  data: state.workout_history.data,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  getMemberHistory,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WorkoutTableContainer));
