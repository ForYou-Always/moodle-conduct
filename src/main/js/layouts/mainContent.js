import React, { Component } from 'react';
import { Menu, Layout, Breadcrumb } from 'antd';
import { withRouter } from 'react-router';
import SideMenu from './sideMenu';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class MainContent extends Component {
  render() {    
    return(
        <Content style={{ /*padding: '0 50px',*/ /*height: '82vh',*/ }}>
          {false && <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>}
          <Layout style={{ /*padding: '24px 0',*/ /*background: '#fff'*/  height: '87vh',  }}>
            {true && <SideMenu/>}
            <Content style={{ /*padding: '0 24px',*/ padding: 5, minHeight: '80%', background: 'white', }}>            
            {this.props.children}
            </Content>
          </Layout>
        </Content>
    );
  }
}
export default withRouter(MainContent);


/*, backgroundImage:'url("./icon/setting.jpg")'*/

//,
//height: '100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' 