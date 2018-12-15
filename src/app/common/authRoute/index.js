import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import loadData from './actions';


class AuthRoute extends React.Component {
  componentDidMount() {
    const publicList = ['/'];
    const { location, history, loadData } = this.props;
    const { pathname } = location;
    if (publicList.indexOf(pathname) > -1) {
      return null;
    }
    axios.get('/user/info').then((res) => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          loadData(res.data.data);
        } else {
          history.push('/');
        }
      }
    });
    return null;
  }

  render() {
    return null;
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  loadData,
}, dispatch);
export default withRouter(connect(null, mapDispatchToProps)(AuthRoute));
