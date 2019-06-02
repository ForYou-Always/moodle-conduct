import React from 'react';
import  PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Form, Input, InputNumber, Tooltip, Icon, Cascader, Select,
  Row, Col, Checkbox, Button, AutoComplete, Radio, Spin, Modal, notification } from 'antd';
  
import * as userActions from '../../actions/actions';
import { restNotification, transactionError } from '../../utils/transaction';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class AddBasicUserInfo extends React.Component {
  state = {
      startFloor: 2,
      endFloor: 5,
      processing: false,
      userDetailData:null,
      isChennai: true
  };

  componentWillReceiveProps(nextProps) {
	  const userDetails = nextProps.userDetails.toJS();
	  if(JSON.stringify(this.props.userDetails.toJS()) !== JSON.stringify(userDetails)){
		  const { empId, domainName } = userDetails;
		  this.props.form.setFieldsValue({ empId, domainName });

		  if(userDetails.locationDetails){
			  const { place, branch, floor, seatNo } = userDetails.locationDetails;
			  this.props.form.setFieldsValue({ floor, seatNo, branch:branch? branch.toLowerCase():'',
					  place:place? place.toLowerCase():'',
			  });
		  }
	  }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    
    const { dispatch, onClose, form } = this.props;
    
    form.validateFieldsAndScroll((err, request) => {
    	if (!err) {
    		if(!this.state.isChennai){
    			request.branch = null;
    		}
    		this.setState({ processing: true });
    		dispatch(userActions.addUserDetail(request))
    		.then(() => {
    			this.setState({ processing: false });
    			restNotification('success',{message:'User Detail Updated Successfully'});
    			onClose();
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
  
  handlePlaceChange = (e) => {
	  const { value } = e.target;
	  this.setState({ isChennai: value==='chennai' });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { openAddUser } = this.props;
    const { startFloor, endFloor, processing, isChennai } = this.state;

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
          title="Add Basic User Info"
          visible={openAddUser}
          footer={null}
          onCancel={() => this.props.onClose()}
        >
          <Spin spinning={processing} tip="Registering User Please Wait...">
            <Form onSubmit={this.handleSubmit} style={{ maxWidth:600 }}>
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
                {getFieldDecorator('mailId', {initialValue: this.context.signedInUser,
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }],
                })(
                  <Input disabled />
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
                label="Place"
              >
                {getFieldDecorator('place', { initialValue: "chennai"})(
                  <RadioGroup onChange={this.handlePlaceChange}>
                    <Radio value="chennai">Chennai</Radio>
                    <Radio value="trichy">Trichy</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              
              {isChennai && <FormItem
                {...formItemLayout}
                label="Branch"
              >
                {getFieldDecorator('branch', { initialValue: "newton"})(
                  <RadioGroup onChange={this.handleBranchChange}>
                    <Radio value="newton">Newton</Radio>
                    <Radio value="edison">Edison</Radio>
                  </RadioGroup>
                )}
              </FormItem>}
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
              </FormItem>          
            </Form></Spin>
        </Modal>
      </div>
    );
  }
}

AddBasicUserInfo.contextTypes = {
  router: PropTypes.object.isRequired,
  signedInUser: PropTypes.string
};

AddBasicUserInfo.propTypes = {
  form: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    userDetails: state.get('userInfo').get('userDetails'),
  };
}

const WrappedAddBasicUserInfo = Form.create()(AddBasicUserInfo);

export default connect(mapStateToProps)(WrappedAddBasicUserInfo);