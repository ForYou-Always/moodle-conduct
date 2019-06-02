import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Layout, Icon } from 'antd';
import { withRouter } from 'react-router';

const { SubMenu } = Menu;
const { Sider } = Layout;

const USER_DETAIL_PATH = "/manage/user/detail";
const ASSET_DETAIL_PATH = "/manage/asset/detail";
const CLOUDCONTROL_DETAIL_PATH = "/manage/cloudcontrol/detail";

class SideMenu extends Component {
  
  state ={
      defaultSelectMenu: ['1'],
  }
  
  handleMenuChange = (menu) => {
    const { router } = this.props;
    if(menu.key==="1"){
      router.push("/manage/user/detail")
    } else if (menu.key==="2"){
      router.push("/manage/asset/detail")
    }else if (menu.key==="3"){
      router.push("/manage/cloudcontrol/detail")
    }
  }
  
  componentWillMount(){
    const { location } = this.props
    if(location.pathname === USER_DETAIL_PATH){
      this.setState({ defaultSelectMenu: ['1'] });
    }else if(location.pathname === ASSET_DETAIL_PATH){
      this.setState({ defaultSelectMenu: ['2'] });
    }else if(location.pathname === CLOUDCONTROL_DETAIL_PATH){
      this.setState({ defaultSelectMenu: ['3'] });
    }
  }
  
  render() {
    const { signedInUser } = this.context; 
    const { defaultSelectMenu } = this.state;
    return(
        <Sider width={250} style={{ /*background: '#fff',*/  /*height: 'inherit',*/  /*height: '85vh',*/ }} theme="dark">
          <Menu
          mode="inline"
          defaultSelectedKeys={defaultSelectMenu}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
          onClick={this.handleMenuChange}
          theme="dark"
          >
            <SubMenu key="sub1" title={<span><Icon type="login" />{signedInUser.split('@')[0]}</span>}>
               <Menu.Item key="1" ><Icon type="solution" />User Information</Menu.Item>
               <Menu.Item key="2" ><Icon type="pay-circle" />Asset Details</Menu.Item>
               <Menu.Item key="3" ><Icon type="cloud" />Cloud Control Details</Menu.Item>
              {false && <Menu.Item key="4">Other Assets</Menu.Item>}
            </SubMenu>            
          </Menu>
        </Sider>
    );
  }
}

SideMenu.contextTypes = {
  signedInUser: PropTypes.string
};

SideMenu.propTypes = {
  signedInUser: PropTypes.string
};

export default withRouter(SideMenu);
//export default withRouter(connect(SideMenu));


/*{false &&  <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
<Menu.Item key="5">option5</Menu.Item>
<Menu.Item key="6">option6</Menu.Item>
<Menu.Item key="7">option7</Menu.Item>
<Menu.Item key="8">option8</Menu.Item>
</SubMenu>}
{false && <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
<Menu.Item key="9">option9</Menu.Item>
<Menu.Item key="10">option10</Menu.Item>
<Menu.Item key="11">option11</Menu.Item>
<Menu.Item key="12">option12</Menu.Item>
</SubMenu>}*/