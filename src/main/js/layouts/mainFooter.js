import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router';

const {  Footer } = Layout;


class MainFooter extends Component {
  render() {    
    return(
        <Footer style={{ textAlign: 'center', color:'black', height: '6vh' }}>
         Della Infotech. All Rights Reserved
        </Footer>
    );
  }
}

export default withRouter(MainFooter);