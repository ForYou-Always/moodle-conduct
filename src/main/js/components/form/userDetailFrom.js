import React from 'react';
import  PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Form, Input, InputNumber, Tooltip, Icon, Cascader, Select,
  Row, Col, Checkbox, Button, AutoComplete, Radio, Spin, Card, Divider } from 'antd';
  
import * as assetActions from '../../actions/actions';
import * as ActionTypes from '../../actions/actionTypes';
import AddBasicUserInfo from '../modal/addBasicUserInfo';
import BasicUserDetails from '../view/basicUserDetails';
import AuthenticateRole from '../../rest/permission/authenticateRole';
import { ROLE } from '../../rest/permission/userRoles';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;

class UserDetailFrom extends React.Component {
  state = {
      processing: false,
      bootAddUser: false,
      gridView: false
  };
  
  componentWillMount() {
	  const { dispatch } = this.props;  
	  dispatch(assetActions.fetchUserDetail());
  }
  
  handleAddAsset = () => {
    this.setState({ bootAddUser: true });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { bootAddUser, processing, gridView } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (<Spin spinning={processing} tip="Registering Asset Please Wait...">
    <AddBasicUserInfo openAddUser={bootAddUser} onClose={() => this.setState({ bootAddUser: false })}/>
    <Row gutter={16} type="flex">
      <Col span={24} offset={23}>
        <Divider type="vertical"/>
        <Button type="primary" shape="circle" icon="edit" onClick={this.handleAddAsset} size={"large"} />
      </Col>
    </Row>
    <Row gutter={16} type="flex">
      <Col span={24}>
        <BasicUserDetails/>
      </Col>
    </Row>
    </Spin>
    );
  }
}

UserDetailFrom.contextTypes = {
  router: PropTypes.object.isRequired,
};

UserDetailFrom.propTypes = {
  form: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    userDetails: state.get('userInfo').get('userDetails'),
  };
}

const WrappedUserDetailFrom = Form.create()(UserDetailFrom);

export default withRouter(connect(mapStateToProps)(WrappedUserDetailFrom));
//export default withRouter(WrappedUserDetailFrom);