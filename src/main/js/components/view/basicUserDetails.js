import React from 'react';
import  PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Form, Input, InputNumber, Tooltip, Icon, Cascader, Select, Table,
  Row, Col, Checkbox, Button, AutoComplete, Radio, Spin, Card, Divider, List } from 'antd';
  
import * as assetActions from '../../actions/actions';
import { cardDetailColumns, getBasicDetails, getSeatingInfo } from './const.js';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class BasicUserDetails extends React.Component {
  state = {
      userDetails:{},
      locationDetails:{},
      processing: false
  };
  
  componentWillReceiveProps(nextProps) {
	  const { userDetails } = nextProps;
	  if(this.props.userDetails !== userDetails){
		  const userData = userDetails.toJS();
		  this.setState({
			  userDetails:userData,
			  locationDetails: userData.locationDetails? userData.locationDetails: {}
		  });
	  }
  }
    
  prepareBasicInfo = () => {
    const { mailId, domainName, empId, createUser, createDate } = this.state.userDetails;
    const basicInfo = [
      <div><Icon type="eye" /> Employee Id : {empId}</div>,
      <div><Icon type="idcard" /> Mail : {mailId}</div>,
      <div><Icon type="laptop" /> Domain Name : {domainName}</div>,
      <div><Icon type="plus" /> Added By : {createUser}</div>,
      <div><Icon type="calendar" /> Added On : {createDate}</div>,
      ];
    return basicInfo;
  }
  
  prepareLocationInfo = (userDetails) => {
    const { branch, floor, seatNo, updateUser, updateDate } = this.state.userDetails;
    
  }
  
  render() {
    const { processing, userDetails, locationDetails } = this.state;
    const NoInfo = "No Update";
    
    return (<Spin spinning={processing} tip="Registering Asset Please Wait...">
    <div style={{ background: '#ECECEC', padding: '30px' }}>
      <Row gutter={16} type="flex">
        <Col span={12}>
          <Card title={<div><Icon type="idcard" />  - Basic Details</div>} bordered={true} style={{  borderRadius:60 }}>
            <Table
              showHeader={false}
              columns={cardDetailColumns}
              dataSource={getBasicDetails(userDetails)}
              bordered={false}
              size={"small"}
              pagination={false}
              style={{backgroundColor: 'ivory', width:550, borderRadius:25 }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title={<div><Icon type="environment-o" />  - Seating Info</div>} bordered={false} style={{  borderRadius:60 }}>
            <Table
              showHeader={false}
              columns={cardDetailColumns}
              dataSource={getSeatingInfo(locationDetails)}
              bordered={false}
              size={"small"}
              pagination={false}
              style={{backgroundColor: 'ivory', width:550, borderRadius:25 }}
            />
          </Card>
        </Col>
      </Row>
      <Divider dashed />
      <Row gutter={16} type="flex">
        <Col span={12}>
          <Card loading title={<div><Icon type="usergroup-add" />  - Employee Roles</div>} bordered={false}>{NoInfo}</Card>
        </Col>
        <Col span={12}>
          <Card loading title={<div><Icon type="usb" />  - Environment Access</div>} bordered={false}>{NoInfo}</Card>
        </Col>
      </Row>
    </div></Spin>
    );
  }
}

BasicUserDetails.contextTypes = {
  router: PropTypes.object.isRequired,
};

BasicUserDetails.propTypes = {
  form: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    userDetails: state.get('userInfo').get('userDetails'),
    locationDetails: state.get('userInfo').get('locationDetails')
  };
}

const WrappedBasicUserDetails = Form.create()(BasicUserDetails);

export default withRouter(connect(mapStateToProps)(BasicUserDetails));
//export default BasicUserDetails;


/*<p><Icon type="eye" /> Employee Id : {empId}</p>,
<p><Icon type="idcard" /> Mail : {mailId}</p>,
<p><Icon type="laptop" /> Domain Name : {domainName}</p>,
<p><Icon type="plus" /> Added By : {createUser}</p>,
<p><Icon type="calendar" /> Added On : {createDate}</p>*/

/*<Card title={<div><Icon type="idcard" />  - Basic Details</div>} bordered={true} >{baseInfo}</Card>*/