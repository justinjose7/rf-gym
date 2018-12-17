import React, { Component, Redirect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.css';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import PopularEquipmentTable from './popularEquipmentTable';
import { getEquipmentTimes } from './actions';

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


class PopularEquipmentTableContainer extends Component {
  state = {
    timePeriod: 'week',
    equipmentName: '',
  }

  componentDidMount() {
    this.updatePopularEquipmentData();
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value },
      () => this.updatePopularEquipmentData());
  };

  updatePopularEquipmentData() {
    const { getEquipmentTimes } = this.props;
    const { equipmentName, timePeriod } = this.state;
    getEquipmentTimes({ equipmentName, timePeriod });
  }

  render() {
    const {
      data, classes, user,
    } = this.props;
    const { timePeriod, equipmentName } = this.state;

    if (user) {
      return (
        <div>
          <TextField
            className={classes.textField}
            type="text"
            value={equipmentName}
            placeholder="Filter equipment"
            name="equipmentName"
            onChange={this.handleChange}
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
          <PopularEquipmentTable data={data} />
        </div>
      );
    }
    return <p>Loading</p>;
    // if (user && !user.isAdmin) {
    //   return <p>Insufficient privileges</p>;
    // }
    // if (!user) {
    //   return <p>Loading</p>;
    // }
    // return <p />;
  }
}

const mapStateToProps = state => ({
  user: state.login_details.data,
  data: state.equipment_statistics.equipmentTimes,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  getEquipmentTimes,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PopularEquipmentTableContainer));
