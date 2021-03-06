import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import HourlyUsageChart from './hourlyUsageChart';
import { getEquipmentHourlyTimes, getListEquipmentNames } from './actions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  options: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    marginTop: 0,
    minWidth: 120,
  },
  selectEmpty: {
    marginLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
  },
});


class HourlyUsageChartContainer extends Component {
  state = {
    equipmentName: 'Bench Press',
    timePeriod: 'week',
  }

  componentDidMount() {
    const { getListEquipmentNames } = this.props;
    getListEquipmentNames();
    this.updateHourlyUsageChartData();
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value },
      () => this.updateHourlyUsageChartData());
  };

  updateHourlyUsageChartData() {
    const { getEquipmentHourlyTimes } = this.props;
    const { equipmentName, timePeriod } = this.state;
    getEquipmentHourlyTimes({ equipmentName, timePeriod });
  }

  render() {
    const {
      chartData, classes, user, listEquipment,
    } = this.props;
    const { equipmentName, timePeriod } = this.state;

    if (user) {
      return (
        <div>
          <FormControl className={classes.formControl}>
            <div className={classes.options}>
              <Select
                value={equipmentName}
                onChange={this.handleChange}
                name="equipmentName"
                className={classes.selectEmpty}
              >
                { listEquipment != null ? listEquipment.map(d => (<MenuItem value={d._id.equipmentName}>{d._id.equipmentName}</MenuItem>)) : null}
              </Select>
              <Select
                value={timePeriod}
                onChange={this.handleChange}
                name="timePeriod"
                className={classes.selectEmpty}
              >
                <MenuItem value="day">Past Day</MenuItem>
                <MenuItem value="week">Past Week</MenuItem>
                <MenuItem value="month">Past Month</MenuItem>
              </Select>
            </div>
            <HourlyUsageChart data={chartData} />
          </FormControl>
        </div>
      );
    }
    return <p>Loading</p>;
  }
}

const mapStateToProps = state => ({
  user: state.login_details.data,
  chartData: state.equipment_statistics.hourlyChartData,
  listEquipment: state.equipment_statistics.listEquipment,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  getEquipmentHourlyTimes, getListEquipmentNames,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HourlyUsageChartContainer));
