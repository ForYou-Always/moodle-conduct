import React, { Component } from 'react';
import { Menu, Layout, Button, Icon, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as assetActions from '../actions/actions';

const { SubMenu } = Menu;
const { Header } = Layout;

class MainHeader extends Component {
  
  handleUserLogout = (e) => {
    this.setState({ processing: true });
    this.props.dispatch(assetActions.logoutUser())
    .then(() => {
      window.location.href="./asset-login.html";
      this.setState({ processing: false });
    });
  }
  
  render() {    
    return(
        <Header className="header">
          <Row>
            <Col span={1}>
              <img border="0" alt="Ansible" src="/icon/adminAsset.png" width="50" height="50" />
            </Col>
            <Col span={13}>
              <h1 style={{ color: 'floralwhite', fontSize:'300%', fontFamily:'-webkit-pictograph' }}>Della Infotech</h1>
             </Col>
            <Col span={1} offset={9}>
               <Button type="dashed" icon="poweroff" size="small" ghost onClick={this.handleUserLogout} >Logout</Button>
            </Col>
          </Row>
        </Header>
    );
  }
}

function mapStateToProps(state) {
  return {
    userDetails: state.get('userInfo').get('details'),
  };
}

export default withRouter(connect(mapStateToProps)(MainHeader));
