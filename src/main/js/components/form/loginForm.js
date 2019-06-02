import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form, Icon, Input, Button, Checkbox, Row, Col, Layout, notification } from 'antd';
import * as assetActions from '../../actions/actions';
import SignUpForm from '../modal/signUpForm';
const { Header, Content, Footer, Sider } = Layout;

const FormItem = Form.Item;



class LoginForm extends React.Component {

  state = {
      processing: false, 
      bootSignUp: false
  }

  handleUserLogin = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, request) => {
      const signInForm = {
          mailId: request.userName,
          password: request.userPass,
      }
      if (!err) {
        this.setState({ processing: true });
        this.props.dispatch(assetActions.loginUser(signInForm))
        .then(() => {
          window.location.href="./asset-main.html";
          this.setState({ processing: false });
        },this.handleErrorResponse);
      }
    });
  }
  
  handleErrorResponse = error => error.response.json().then((response) => {
    notification['error']({
      message: response.error,
      description: response.message,
      duration: 6
    });
  });
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (<div className="bg" ><div style={{ position:'relative', top:'32%' }} >
      <Form onSubmit={this.handleUserLogin} className="login-form" style={{ background:'currentColor', maxWidth:400, width:'50%', padding:10 , position:'relative', left:'38%', top:'50%' }}>
      
      
      <Row gutter={16} type="flex">
        <Col span={12}>
          <img style={{ marginBottom: 15 }} border="0" alt="Ansible" src="/icon/setting.jpg" width="120" height="120" />
        </Col>
        <Col span={12}>
          <h1 style={{ color: 'floralwhite', fontSize:'200%', fontFamily:'-webkit-pictograph' }}>Della Infotech</h1>
        </Col>
      </Row>
      
      
      
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
             <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Mail Id" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('userPass', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox style={{ color:'#1890ff'}}>Remember me</Checkbox>
          )}
          <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
            Sign In
          </Button>
          <a onClick={() => this.setState({ bootSignUp: true })} >Sign Up!</a>
          {false && <a className="login-form-forgot" href="" style={{ float: 'right' }}>Forgot password</a>}
        </FormItem>
      </Form><SignUpForm showModal={this.state.bootSignUp} onClose={() => this.setState({ bootSignUp: false })}/></div></div>
    );
  }
}

LoginForm.contextTypes = {
    router: PropTypes.object.isRequired,
  };

LoginForm.propTypes = {
    form: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    userDetails: state.get('userInfo').get('details'),
  };
}

const WrappedLoginForm = Form.create()(LoginForm);

export default connect(mapStateToProps)(WrappedLoginForm);
