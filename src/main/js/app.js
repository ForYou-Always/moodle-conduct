import React, { Component } from 'react';
import { Layout } from 'antd';
import  PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MainHeader from './layouts/mainheader';
import MainContent from './layouts/mainContent';
import MainFooter from './layouts/mainFooter';
import Authentication from './rest/authentication';

class App extends Component {
  render() {
    
    const { children } = this.props;
    
    return(<Authentication>
        <Layout style={{ height: '100%' }}>
          <MainHeader/>            
          <MainContent>{this.props.children}</MainContent>
          <MainFooter/>
        </Layout></Authentication>
    );
  }
}


App.contextTypes = {
  router: PropTypes.object.isRequired,
};

App.propTypes = {
  form: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    assetDetails: state.get('userInfo').get('details'),
  };
}

//export default withRouter(connect(App));
export default withRouter(connect(mapStateToProps)(App));
