import React from 'react';
import  PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Spin } from 'antd';

class AuthenticateRole extends React.Component {
  
  
  checkAccessibleRoles = (roles) => {
    const { accessibleRoleList } = this.props;
    const userRoles = roles? roles.toJS():[];
    let result = true;
    
    for (const role in accessibleRoleList){
      if(userRoles.indexOf(accessibleRoleList[role])===-1){
        result = false;
        return result;
      }
    }
    return result;
  }

  render() {
    
    const { children } = this.props;
    const { signedInUser, roles } = this.context;
    
    if(this.checkAccessibleRoles(roles) && signedInUser){
      return children;
    };
    return null;
  }
}

AuthenticateRole.contextTypes = {
  signedInUser: PropTypes.string,
  roles: PropTypes.array
};

AuthenticateRole.propTypes = {
  signedInUser: PropTypes.string,
  roles: PropTypes.array.isRequired,
};

export default AuthenticateRole;