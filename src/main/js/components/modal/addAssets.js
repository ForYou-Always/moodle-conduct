import React from 'react';
import  PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, message as AntMessage } from 'antd';
import { Form, Input, InputNumber, Tooltip, Icon, Cascader, Select,
  Row, Col, Checkbox, Button, AutoComplete, Radio, Spin } from 'antd';
import * as assetActions from '../../actions/actions';
import { restNotification, transactionError } from '../../utils/transaction';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const defaultAssetTypes = ['CPU','MONITOR','KEYBOARD','MOUSE'];
const adminAccessedAssets = ['SERVER','PRINTER','SHREDDER','IP-PHONE',
  'LAN-PHONE','ROUTER','SWITCH','WEB-CAM'];

const defaultAssetMake = ['DELL', 'HP', 'CISCO'];
const defaultAssetModel = ['OPTIPLEX7040', 'OPTIPLEX3020'];
  
class AddAssets extends React.Component {
  constructor(props,context){
    super(props,context);

    const userRole = context.roles.toJS();

    this.state = {
        startFloor: 2,
        endFloor: 5,
        processing: false,
        cpuAssetSelected: false,
        isNewType: false,
        isNewMake: false,
        isNewModel: false,
        assetMakeList:defaultAssetMake,
        assetModelList:defaultAssetModel,
        userRole,
    }
  }
  
  isAdminUser(){
    const { userRole } = this.state;
    return (userRole.indexOf("SYSTEM_ADMIN") !== -1 ||
        userRole.indexOf("SYSTEM_ADMIN") !== -1);
  }
	
  componentWillMount(){
    const { dispatch } = this.props;
    dispatch(assetActions.fetchDistinctAssetDetail());

    if(this.isAdminUser()){
      this.state['assetTypeList'] = defaultAssetTypes.concat(adminAccessedAssets);
    } else{
      this.state['assetTypeList'] = defaultAssetTypes;
    }
  }
  
  componentWillReceiveProps(nextProps,nextState){
    const { distinctAssetDetails } = nextProps;
    
    if(this.props.distinctAssetDetails !== distinctAssetDetails){
      const distinctAssetRecord = distinctAssetDetails.toJS();
      
      const assetTypeList = distinctAssetRecord.map(asset => asset.assetType).filter(
          (value, index, self) => self.indexOf(value) === index);
      
      const assetMakeList = distinctAssetRecord.map(asset => asset.make).filter(
          (value, index, self) => self.indexOf(value) === index);
      
      const assetModelList = distinctAssetRecord.map(asset => asset.model).filter(
          (value, index, self) => self.indexOf(value) === index);
      
      this.setState({
//        assetTypeList,
        assetMakeList,
        assetModelList });
    }
  }
  
  handleSubmit = (e) => {
    const { dispatch } = this.props;
    e.preventDefault();
    
    const { isNewType, isNewMake, isNewModel  } = this.state;
    
    if(isNewType || isNewMake || isNewModel ){
      restNotification('error',{message:'Please Confirm addition of new assets Type/Make/Model'});
      return;
    }
    
    
    this.props.form.validateFieldsAndScroll((err, request) => {
      if (!err) {
        this.setState({ processing: true });
        request.mailId = this.context.signedInUser;
        dispatch(assetActions.addAssetDetail(request)).then(() => {
          this.setState({ processing: false });
          dispatch(assetActions.fetchAssetDetail());
          restNotification('success',{message:'Asset Detail Updated Successfully'});
          this.props.onClose();
        },this.handleError);
      }
    });
  }

  handleError = error => {
    this.setState({ processing: false });
    transactionError(error);
  };
  
  handleTypeChange = (value) => {
    this.setState({ cpuAssetSelected: (value==='CPU')});
    this.setState({ type: value }, () => {
      this.props.form.setFieldsValue({ type: value });
    });
  }
  
  handleTypeClick = () => {
    const { newAssetType, isNewType, assetTypeList } = this.state; 
    if(isNewType){
      const type = newAssetType.toUpperCase();
      assetTypeList.push(type);
      this.setState({ isNewType: false, type, assetTypeList  }, () => {
        this.props.form.setFieldsValue({ type });
      });
    } else {
      this.setState({ isNewType: true });
    }
  }
  
  handleNewTypeChange = (e) => {
    this.setState({ newAssetType: e.target.value });
  }
  
  handleMakeChange = (value) => {
    this.setState({ make: value }, () => {
      this.props.form.setFieldsValue({ make: value });
    });
  }
  
  handleMakeClick = () => {
    const { newMake, isNewMake, assetMakeList } = this.state; 
    if(isNewMake){
      const make = newMake.toUpperCase();
      assetMakeList.push(make);
      this.setState({ isNewMake: false, make, assetMakeList }, () => {
        this.props.form.setFieldsValue({ make });
      });
    } else {
      this.setState({ isNewMake: true });
    }
  }
  
  handleNewMakeChange = (e) => {
    const newMake = e.target.value;
    this.setState({ newMake });
  }

  handleModelChange = (value) => {
    this.setState({ model: value }, () => {
      this.props.form.setFieldsValue({ model: value });
    });
  }
  
  handleModelClick = () => {
    const { newModel, isNewModel, assetModelList } = this.state; 
    if(isNewModel){
      const model = newModel.toUpperCase();
      assetModelList.push(model);
      this.setState({ isNewModel: false, model, assetModelList  }, () => {
        this.props.form.setFieldsValue({ model });
      });
    } else {
      this.setState({ isNewModel: true });
    }
  }
  
  handleNewModelChange = (e) => {
    this.setState({ newModel: e.target.value });
  }
  
  getUniqueAssetInfo = () => {
    const { assetTypeList, assetMakeList, assetModelList } = this.state;
    return {
      assetTypeList: assetTypeList.filter((val, i, self) => self.indexOf(val) === i),
      assetMakeList: assetMakeList.filter((val, i, self) => self.indexOf(val) === i),
      assetModelList: assetModelList.filter((val, i, self) => self.indexOf(val) === i)
    }
  }
  
  filterNonAdminAssets = () => {
    
  }
  
  render() {
    
    this.filterNonAdminAssets();
    
    const { getFieldDecorator } = this.props.form;
    const { openAddAsset } = this.props;
    const { startFloor, endFloor, processing, cpuAssetSelected } = this.state;
    const {  isNewMake, isNewModel, isNewType, type, make, model } = this.state;
    const { assetTypeList, assetMakeList, assetModelList } = this.getUniqueAssetInfo();
    
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
      <div>
        <Modal
          title="Add New Asset"
          visible={openAddAsset}
          footer={null}
          onCancel={() => this.props.onClose()}
        >
          <Spin spinning={processing} tip="Registering Asset Please Wait...">
            <Form onSubmit={this.handleSubmit} style={{ maxWidth:650 }}>
             {!isNewType &&  <FormItem
                {...formItemLayout}
                label="Asset Type"
              >
                {getFieldDecorator('type', {
                  rules: [{
                    required: true, message: 'Please Select a Asset Type!',
                  }],
                })(<div>
                      <Select  style={{ width: '85%' }} showSearch value={type}
                       onChange={this.handleTypeChange}  placeholder="Please Select a Asset Type"  >
                        {assetTypeList.map(asset => <Option value={asset} disabled>{asset}</Option> )}
                      </Select>
                      <Button icon={"plus"} type="primary" style={{ marginLeft: 1 }} onClick={this.handleTypeClick} />
                    </div>
                )}
              </FormItem>}
             
             {isNewType &&  <FormItem
               {...formItemLayout}
               label="New Asset Type"
             >
               {getFieldDecorator('newAssetType', {
                 rules: [{
                   required: true, message: 'Please Add a Asset Type!',
                 }],
               })(<div>
                   <Input style={{ width: '78%' }} onChange={this.handleNewTypeChange} />
                   <Button icon="check" type="primary" style={{ marginLeft: 1 }} onClick={this.handleTypeClick} />
                   <Button icon="close" type="danger" style={{ marginLeft: 1 }} onClick={() => this.setState({ isNewType:false },() =>{ 
                       this.props.form.setFieldsValue({ type: type });
                   })} />
                 </div>
               )}
             </FormItem>}
              
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                  Asset Name&nbsp;
                    <Tooltip title="Asset Name starts with Info.. or IV..">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                )}
              >
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your Asset Name!', whitespace: true }],
                })(
                  <Input />
                )}
              </FormItem>
              
             {!isNewMake &&  <FormItem
                {...formItemLayout}
                label="Make"
              >
                {getFieldDecorator('make', {
                  rules: [{
                    required: true, message: 'Please Select a Manufacturer!',
                  }],
                })(
                    <div>
                      <Select style={{ width: '85%' }} showSearch value={make}
                      onChange={this.handleMakeChange} placeholder="Please Select a Asset Manufacturer!">
                        {assetMakeList.map(asset => <Option value={asset}>{asset}</Option> )}
                      </Select>
                      <Button icon={"plus"} type="primary" style={{ marginLeft: 1 }} onClick={this.handleMakeClick} />
                    </div>
                )}
              </FormItem>}
              
              
              {isNewMake && <FormItem
                {...formItemLayout}
                label="New Make"
              >
                {getFieldDecorator('newMake', {
                  rules: [{
                    required: true, message: 'Please Add a Manufacturer!',
                  }],
                })(
                    <div>
                      <Input style={{ width: '78%' }} onChange={this.handleNewMakeChange} />
                      <Button icon="check" type="primary" style={{ marginLeft: 1 }} onClick={this.handleMakeClick} />
                      <Button icon="close" type="danger" style={{ marginLeft: 1 }} onClick={() => this.setState({ isNewMake:false },() =>{ 
                              this.props.form.setFieldsValue({ make: this.state.make });
                      })} />
                    </div>
                )}
              </FormItem>}
              
              {!isNewModel && <FormItem
              {...formItemLayout}
              label="Model"
                >
              {getFieldDecorator('model', {
                rules: [{
                  required: true, message: 'Please Select a Model',
                }],
              })(
                  <div>
                    <Select style={{ width: '85%' }} showSearch value={model}
                      onChange={this.handleModelChange} placeholder="Please Select a Model">
                    {assetModelList.map(model => <Option value={model}>{model}</Option> )}
                    </Select>
                    <Button icon={"plus"} type="primary" style={{ marginLeft: 1 }} onClick={this.handleModelClick} />
                  </div>
              )}
              </FormItem>}
              
              {isNewModel && <FormItem
              {...formItemLayout}
              label="New Model"
                >
              {getFieldDecorator('newModel', {
                rules: [{
                  required: true, message: 'Please Add a New Model',
                }],
              })(
                  <div>
                    <Input style={{ width: '78%' }} onChange={this.handleNewModelChange} />
                    <Button icon={"check"} type="primary" style={{ marginLeft: 1 }} onClick={this.handleModelClick} />
                    <Button icon="close" type="danger" style={{ marginLeft: 1 }} onClick={() => this.setState({ isNewModel:false },() =>{ 
                      this.props.form.setFieldsValue({ model: this.state.model });
                      })} />
                  </div>
              )}
              </FormItem>}
                  
              <FormItem
                {...formItemLayout}
                label="Serial No"
              >
                {getFieldDecorator('serialNo', { rules: [{
                    type: 'string',
                  }, {
                    required: true, message: 'Please Fill your Asset Serial No!',
                  }],
                })(
                   <Input/>
                )}
              </FormItem>
              {cpuAssetSelected && <FormItem
                {...formItemLayout}
                label="Host Name"
              >
                {getFieldDecorator('hostName', {
                  rules: [{
                    type: 'string', message: 'The input is not valid Employee ID!',
                  }, {
                    required: true, message: 'Please input your Employee ID!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>}
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Register</Button>
              </FormItem>         
            </Form></Spin>
        </Modal>
      </div>
    );
  }
}

AddAssets.contextTypes = {
  router: PropTypes.object.isRequired,
  signedInUser: PropTypes.string,
  roles:PropTypes.object
};

AddAssets.propTypes = {
  form: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    distinctAssetDetails: state.get('userInfo').get('distinctAssetDetails'),
  };
}

const WrappedAddAssets = Form.create()(AddAssets);

export default connect(mapStateToProps)(WrappedAddAssets);