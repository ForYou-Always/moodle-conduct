import React from 'react';
import  PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Form, Input, InputNumber, Tooltip, Icon, Cascader, Select, Switch, Steps,
  Row, Col, Checkbox, Button, AutoComplete, Radio, Spin, Modal, notification } from 'antd';
  
import * as userActions from '../../../actions/actions';
import { restNotification, transactionError } from '../../../utils/transaction';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Step = Steps.Step;

const styles={
    label: {
      color: 'rgba(0, 0, 0, 0.85)',
      textAlign:'right',
      lineHeight:'39.9999px',
      whiteSpace: 'nowrap'
    },
    stepContent: {
      marginTop: 16,
      border: '1px dashed #e9e9e9',
      borderRadius: 6,
      backgroundColor: '#fafafa',
      minHeight: 200,
      textAlign: 'center',
      paddingTop: 80,
    }
}

const authorityTypes=["SYSTEM_ADMIN", "ADMIN", "MANAGER", "DEVELOPER", "TESTER"];

class AddUserInfo extends React.Component {
  state = {
      startFloor: 2,
      endFloor: 5,
      processing: false,
      userDetailData:{},
      defaultPassword:true,
      currentStep:0
  };
  
  componentWillReceiveProps(nextProps) {
  }
  
  
  handleUserRegistration = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, request) => {
      if (!err) {
        this.setState({ processing: false });
        this.props.dispatch(userActions.registerNewUser(request))
        .then(() => {
          this.setState({ processing: false });
          restNotification('success',{message:'Registration Success For User'});
          this.props.form.resetFields;
          this.props.onClose();
        },this.handleError);
      }
    });
  }

  handleError = error => {
    this.setState({ processing: false });
    transactionError(error);
  };
  
  validatePassword = (rule, value, callback) => {
    callback();
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { openAddUser } = this.props;
    const { startFloor, endFloor, processing, addLocation } = this.state;
    const { defaultPassword, currentStep } = this.state;

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

    return (
      <Modal
          title="Register New User"
          visible={openAddUser}
          footer={null}
          width={500}
          maskClosable={false}
          afterClose={() => this.props.form.resetFields}
          onCancel={() => this.props.onClose()}
        >
        <Spin spinning={processing} tip="Registering User Please Wait...">
          <Form onSubmit={this.handleUserRegistration} className="registration-form" style={{ maxWidth: 600 }}>
            <FormItem
              {...formItemLayout}
              label="E-mail"
            >
              {getFieldDecorator('mailId', {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Please input your E-mail!',
                }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Password"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" />
              )}
            </FormItem>
            
            <FormItem
                {...formItemLayout}
                label="Authority"
              >
                {getFieldDecorator('authority')(
                    <Select mode="multiple" style={{ width: '85%' }} showSearch
                      onChange={this.handleMakeChange} placeholder="Please Select a Asset Manufacturer!">
                      {authorityTypes.map(authority => <Option value={authority}>{authority}</Option> )}
                    </Select>
                )}
            </FormItem>    
            
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">Register</Button>
            </FormItem>
                
          </Form>
        </Spin>
      </Modal>
    );
  }
}

AddUserInfo.contextTypes = {
  router: PropTypes.object.isRequired,
  signedInUser: PropTypes.string
};

AddUserInfo.propTypes = {
  form: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    userDetails: state.get('userInfo').get('userDetails'),
  };
}

const WrappedAddUserInfo = Form.create()(AddUserInfo);

export default connect(mapStateToProps)(WrappedAddUserInfo);
