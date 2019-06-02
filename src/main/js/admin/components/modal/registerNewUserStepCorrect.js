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
//    const { userDetails } = nextProps;
//    const userDetailData = userDetails.toJS();
//    
//    if(JSON.stringify(this.state.userDetailData) !== JSON.stringify(userDetailData)){
//      this.setState({ userDetailData });
//      const { empId, mailId, domainName, branch, floor, seatNo } = userDetailData;
//      this.props.form.setFieldsValue({ empId, mailId, domainName, floor, seatNo, branch:branch.toLowerCase() });
//    }
  }
  
  handleNewUserSignUp = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, request) => {
      if (!err) {
        console.log('Received values of handleNewUserSignUp form: ', request);
        this.setState({ processing: false, currentStep: 1 });        
        /*this.props.dispatch(assetActions.signUpNewUser(request))
        .then(() => {
          notification['success']({
            message: "Registration Success For User",
            description: request.mailId+"",
            duration: 6
          });
          this.setState({ processing: false });
          this.props.onClose();
        },this.handleErrorResponse);*/
      }
    });
  }
  
  handleLocationUpdate = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, request) => {
      if (!err) {
        this.setState({ processing: false, currentStep: 2 });
        /*this.props.dispatch(userActions.addUserDetail(request))
        .then(() => {
          this.setState({ processing: false });
          restNotification('success',{message:'User Detail Updated Successfully'});
          this.props.onClose();
        },this.handleError);*/
      }
    });
  }

  handleError = error => {
    this.setState({ processing: false });
    transactionError(error);
  };
  
  handleBranchChange = (e) => {
    const { value } = e.target;
    this.props.form.setFieldsValue({ floor: 2 });
    this.setState({ startFloor: 2, endFloor: (value === "newton")? 5:7 });
  }
  
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

    return (<div>
        <Modal
          title="Register New User "
          visible={openAddUser}
          footer={null}
          width={500}
          maskClosable={false}
          afterClose={() => {this.props.form.resetFields;this.setState({ currentStep:0 })}}
          onCancel={() => this.props.onClose()}
        >
          <Spin spinning={processing} tip="Registering User Please Wait...">
            <Steps current={currentStep}>
              <Step title="Register" description="Create New user" icon={<Icon type="user" />} />
              <Step title="Authority" description="Assign Roles user" icon={<Icon type="solution" />} />
              <Step title="Location" description="Update location info" icon={<Icon type="environment-o" />} />
            </Steps>
            
            
            {(currentStep === 0) && <div style={styles.stepContent}>
              <Form onSubmit={this.handleNewUserSignUp} className="registration-form" style={{ maxWidth: 400 }}>
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
                label="Default Password"
              >
                {getFieldDecorator('configurePassword', {initialValue: defaultPassword, valuePropName: 'checked' })(
                  <Switch onChange={(defaultPassword) => this.setState({ defaultPassword })}/>
                )}
              </FormItem>
                  
              {!defaultPassword && <FormItem
                {...formItemLayout}
                label="Password"
              >
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: 'Please input your password!',
                  }, {
                    validator: this.validatePassword,
                  }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" />
                )}
              </FormItem>}
              
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" size="medium" htmlType="submit">REGISTER</Button>
              </FormItem> 
            </Form></div>}
              
            {(currentStep === 1) && <div style={styles.stepContent}>
            
              <Checkbox >ADMIN</Checkbox>
              <Checkbox >SYSTEM ADMIN</Checkbox><br/>
              <Checkbox >MANAGER</Checkbox>
              <Checkbox >HR</Checkbox><br/>
              <Checkbox >DEVELOPER</Checkbox>
              <Checkbox >TESTER</Checkbox>
            
            </div>}  
              
              
            {(currentStep === 2) && <div style={styles.stepContent}>
            <Form onSubmit={this.handleLocationUpdate} style={{ maxWidth:600 }}>
                <FormItem
                {...formItemLayout}
                label="Emp-ID"
              >
                {getFieldDecorator('empId', {
                  rules: [{
                    type: 'string', message: 'The input is not valid Employee ID!',
                  }, {
                    required: true, message: 'Please input your Employee ID!',
                  }],
                })(
                  <Input />
                )}
              </FormItem> 
              <FormItem
                {...formItemLayout}
                label={(
                    <span>
                    Mail-ID&nbsp;
                      <Tooltip title="Your Macky Mail ID">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  )}
              >
                {getFieldDecorator('mailId', {rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>        
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                  Domain Name&nbsp;
                    <Tooltip title="Your Machine Login Name">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                )}
              >
                {getFieldDecorator('domainName', {
                  rules: [{ required: true, message: 'Please input your domainName!', whitespace: true }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Branch"
              >
                {getFieldDecorator('branch', { initialValue: "newton"})(
                  <RadioGroup onChange={this.handleBranchChange}>
                    <Radio value="newton">Newton</Radio>
                    <Radio value="edison">Edison</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Floor-No"
              >
                {getFieldDecorator('floor', { initialValue: 2,
                  rules: [{
                    type: 'number',
                  }, {
                    required: true, message: 'Please Fill your Current Seated Floor!',
                  }],
                })(
                   <InputNumber min={startFloor} max={endFloor} style={{ width: 50 }}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Seat-No"
              >
                {getFieldDecorator('seatNo', {
                  rules: [{
                    type: 'string', message: 'The input is not valid Employee ID!',
                  }, {
                    required: true, message: 'Please Fill your Employee ID!',
                  }],
                })(
                  <Input style={{ width: 50 }}/>
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">UPDATE</Button>
                <Button type="primary" style={{ marginLeft:2 }} ghost onClick={() => this.setState({ currentStep:1 })}>Skip</Button>
              </FormItem>
            </Form></div>}
            </Spin>
        </Modal>
      </div>
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



/*<FormItem
{...formItemLayout}
label={(
  <span>
  Domain Name&nbsp;
    <Tooltip title="Your Machine Login Name">
      <Icon type="question-circle-o" />
    </Tooltip>
  </span>
)}
>
{getFieldDecorator('domainName', {
  rules: [{ required: true, message: 'Please input your domainName!', whitespace: true }],
})(
  <Input />
)}
</FormItem>
<FormItem
{...formItemLayout}
label="Branch"
>
{getFieldDecorator('branch', { initialValue: "newton"})(
  <RadioGroup onChange={this.handleBranchChange}>
    <Radio value="newton">Newton</Radio>
    <Radio value="edison">Edison</Radio>
  </RadioGroup>
)}
</FormItem>
<FormItem
{...formItemLayout}
label="Floor-No"
>
{getFieldDecorator('floor', { initialValue: 2,
  rules: [{
    type: 'number',
  }, {
    required: true, message: 'Please Fill your Current Seated Floor!',
  }],
})(
   <InputNumber min={startFloor} max={endFloor} style={{ width: 50 }}/>
)}
</FormItem>
<FormItem
{...formItemLayout}
label="Seat-No"
>
{getFieldDecorator('seatNo', {
  rules: [{
    type: 'string', message: 'The input is not valid Employee ID!',
  }, {
    required: true, message: 'Please Fill your Employee ID!',
  }],
})(
  <Input style={{ width: 50 }}/>
)}
</FormItem>
<FormItem {...tailFormItemLayout}>
<Button type="primary" htmlType="submit">UPDATE</Button>
</FormItem> */