import React from 'react';
import  PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Form, Input, InputNumber, Tooltip, Icon, Cascader, Select,
  Row, Col, Checkbox, Button, AutoComplete, Radio, Spin, Card, Divider } from 'antd';
  
import * as assetActions from '../../../actions/actions';
import RegisterNewUser from '../modal/registerNewUser';
import CompleteUserDetails from '../view/completeUserDetails';
import AuthenticateRole from '../../../rest/permission/authenticateRole';
import { ROLE } from '../../../rest/permission/userRoles';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;

class HumanResourceDetail extends React.Component {
  state = {
      processing: false,
      bootUserRegistration: false,
  };
  
  componentWillMount() {
    this.props.dispatch(assetActions.fetchUserDetail());
  }
  
  handleUserRegistration = () => {
    this.setState({ bootUserRegistration: true });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { bootUserRegistration, processing } = this.state;

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
    <RegisterNewUser openAddUser={bootUserRegistration} onClose={() => this.setState({ bootUserRegistration: false })}/>
    <Row gutter={16} type="flex">
      <Col span={24} offset={23}>
        <Divider type="vertical"/>
        <Button type="primary" shape="circle" icon="plus-square" onClick={this.handleUserRegistration} size={"large"} />
      </Col>
    </Row>
    <Row gutter={16} type="flex">
      <Col span={24}>
        <CompleteUserDetails/>
      </Col>
    </Row>
    </Spin>
    );
  }
}

HumanResourceDetail.contextTypes = {
  router: PropTypes.object.isRequired,
};

HumanResourceDetail.propTypes = {
  form: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    userDetails: state.get('userInfo').get('userDetails'),
  };
}

const WrappedHumanResourceDetail = Form.create()(HumanResourceDetail);

export default withRouter(connect(mapStateToProps)(WrappedHumanResourceDetail));
//export default withRouter(WrappedHumanResourceDetail);