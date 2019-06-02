import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as assetActions from '../actions/actions';
//import AuthenticationShadow from './AuthenticationShadow';
import { Spin } from 'antd';

class Authentication extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      signedInUser: null,
      roles: {},
      processing: false
    };
  }

  getChildContext() {
	  const { authorityInfo } = this.props;
	  if(authorityInfo){
		  return {
			  roles: authorityInfo.get('roles'),
			  signedInUser: authorityInfo.get('signedInUser'),
			  mailId: authorityInfo.get('signedInUser')
		  };
	  }
  }

  componentWillMount() {
    this.props.dispatch(assetActions.authenticateUser());
  }
  
  componentWillReceiveProps(nextProps) {
    const { authorityInfo } = nextProps;
    if(nextProps !== this.props){
      this.setState({
        signedInUser: authorityInfo.get('signedInUser'),
        mailId: authorityInfo.get('signedInUser'),
        roles: authorityInfo.get('roles')
      });
    }
  }
  
  render() {
    
    const { signedInUser, processing } = this.state;
    const { children } = this.props;
    
    if (signedInUser) {
      return children;
    }
    
    return (<Spin spinning={processing} tip="Authenticating User Please Wait..."/>);
  }

}

Authentication.childContextTypes = {
  roles: PropTypes.object,
  mailId: PropTypes.string,
  signedInUser: PropTypes.string,
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    authorityInfo: state.get('userInfo').get('authorityInfo'),
  };
}

export default withRouter(connect(mapStateToProps)(Authentication));
// export default withRouter(connect(Authentication));
// export default connect(Authentication);