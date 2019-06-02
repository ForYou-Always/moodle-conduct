import React, { Component } from 'react';
import { Layout } from 'antd';
import  PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
//import MainHeader from '../layouts/mainHeader';
import MainContent from '../layouts/mainContent';
//import MainFooter from '../layouts/mainFooter';

class AdminDashBoard extends Component {
  render() {
    
    return(
        <Layout style={{ height: '100%' }}>
          <MainContent>{this.props.children}</MainContent>
        </Layout>
    );
  }
}


AdminDashBoard.contextTypes = {
  router: PropTypes.object.isRequired,
};

AdminDashBoard.propTypes = {
  form: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    assetDetails: state.get('userInfo').get('details'),
  };
}

export default withRouter(connect(mapStateToProps)(AdminDashBoard));