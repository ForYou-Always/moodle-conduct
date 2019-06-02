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
      userDetailData:{}
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
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, request) => {
      if (!err) {
        this.setState({ processing: true });
        this.props.dispatch(userActions.addUserDetail(request))
        .then(() => {
          this.setState({ processing: false });
          restNotification('success',{message:'User Detail Updated Successfully'});
          this.props.onClose();
        },this.handleError);
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
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { openAddUser } = this.props;
    const { startFloor, endFloor, processing, addLocation } = this.state;

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
          onCancel={() => this.props.onClose()}
        >
          <Spin spinning={processing} tip="Registering User Please Wait...">
            <Steps current={current}>
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
              
            <div style={styles.stepContent}>
            {steps[this.state.current].content}
            </div>
            
            
            
            
            
            <div className="steps-action">
              {
                this.state.current < steps.length - 1
                &&
                <Button type="primary" onClick={() => this.next()}>Next</Button>
              }
              {
                this.state.current === steps.length - 1
                &&
                <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
              }
              {
                this.state.current > 0
                &&
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  Previous
                </Button>
              }
            </div>
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