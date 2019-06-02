import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as assetActions from '../../actions/actions';
import { Form, Icon, Input, Button, Checkbox, Modal, Spin, notification } from 'antd';

const FormItem = Form.Item;

class SignUpForm extends React.Component {
  
  state = {
      processing: false,
  }
  
  handleNewUserSignUp = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, request) => {
      if (!err) {
        this.setState({ processing: true });
        this.props.dispatch(assetActions.signUpNewUser(request))
        .then(() => {
          notification['success']({
            message: "Registration Success For User",
            description: request.mailId+"",
            duration: 6
          });
          this.setState({ processing: false });
          this.props.onClose();
        },this.handleErrorResponse);
      }
    });
  }

  handleErrorResponse = error => error.response.json().then((response) => {
    this.setState({ processing: false });
    notification['error']({
      message: response.error,
      description: response.message,
      duration: 6
    });
  });
  
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { showModal } = this.props;
    const { processing } = this.state;
    
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
        title="Sign Up"
        visible={showModal}
        footer={null}
        onCancel={() => this.props.onClose()}
      >
      <Spin spinning={processing} tip="Registering User Please Wait...">
      <Form onSubmit={this.handleNewUserSignUp} className="login-form" style={{ maxWidth: 400 }}>
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
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form></Spin>
      </Modal>
    );
  }
}

SignUpForm.contextTypes = {
    router: PropTypes.object.isRequired,
  };

SignUpForm.propTypes = {
    form: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    userDetails: state.get('userInfo').get('details'),
  };
}

const WrappedSignUpForm = Form.create()(SignUpForm);

export default connect(mapStateToProps)(WrappedSignUpForm);