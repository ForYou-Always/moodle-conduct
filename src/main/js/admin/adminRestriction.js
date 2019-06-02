import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { AuthorizedComponent } from 'react-router-role-authorization';
import { Layout } from 'antd';
import MainHeader from '../layouts/mainheader';
import MainContent from '../layouts/mainContent';
import AuthenticateRole from '../rest/permission/authenticateRole';
import { ROLE } from '../rest/permission/userRoles';
import AdminSideMenu from './adminSideMenu';

const { Content, Footer } = Layout;

class AdminRestriction extends AuthorizedComponent {
  constructor(props, context) {
    super(props);
    const { roles } = context;
    this.userRoles = roles? roles.toJS():[];
    this.notAuthorizedPath = '/manage/user/detail';
//    this.userRoles = [];
//    this.notAuthorizedPath = '/not-found';
  }
 
  render() {
    
    const { children } = this.props;
    
    if(children){
      return(
        <AuthenticateRole accessibleRoleList={[ROLE.ADMIN]}>
          <Layout style={{ height: '100%' }}>
            <MainHeader/>
            {false && <MainContent>{children}</MainContent>}
            <Content style={{ /*padding: '0 50px',*/ /*height: '82vh',*/ }}>
              <Layout style={{ /*padding: '24px 0',*/ /*background: '#fff'*/  height: '87vh',  }}>
                {true && <AdminSideMenu/>}
                <Content style={{ /*padding: '0 24px',*/ padding: 5, minHeight: '90%', background: 'white', }}>            
                {children}
                </Content>
              </Layout>
            </Content>
          </Layout>
        </AuthenticateRole>
      );
    }
    
    return null;
  }
}

AdminRestriction.contextTypes = {
  roles: PropTypes.object,
  router: PropTypes.object.isRequired,
};

AdminRestriction.propTypes = {
  roles: PropTypes.object,
};


function mapStateToProps(state) {
  return {
    assetDetails: state.get('userInfo').get('details'),
  };
}
 
//export default AdminRestriction;

export default withRouter(connect(mapStateToProps)(AdminRestriction));
