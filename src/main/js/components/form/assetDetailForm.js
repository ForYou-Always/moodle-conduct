import React from 'react';
import  PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Form, Input, InputNumber, Tooltip, Icon, Cascader, Select,
  Row, Col, Checkbox, Button, AutoComplete, Radio, Spin, Card, Divider } from 'antd';
  
import * as assetActions from '../../actions/actions';
import AddAsset from '../modal/addAssets' 
import BasicAssetView from '../view/basicAssetView' 
import CompleteAssetsView from '../view/completeAssetsView' 

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;

class AssetDetailFeedFrom extends React.Component {
  state = {
      processing: false,
      bootAddAsset: false,
      gridView: false
  };
  
  componentDidMount() {
    this.props.dispatch(assetActions.fetchAssetDetail());
  }
  
  handleAddAsset = () => {
    this.setState({ bootAddAsset: true });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { bootAddAsset, processing, gridView } = this.state;

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
    {true && <AddAsset openAddAsset={bootAddAsset} onClose={() => this.setState({ bootAddAsset: false })}/>}
    {false && <Button type="primary" onClick={this.showModal}>Add New Asset</Button>}
    <Row gutter={16} type="flex">
      <Col span={24} offset={22}>
        <ButtonGroup>
          <Button icon="appstore" onClick={() => this.setState({ gridView:false })} autoFocus />
          <Button icon="table" onClick={() => this.setState({ gridView:true })} />
        </ButtonGroup>
        <Divider type="vertical"/>
        <Button type="primary" shape="circle" icon="plus-square" onClick={this.handleAddAsset} size={"large"} />
      </Col>
    </Row>
    <Row gutter={16} type="flex">
      <Col span={24}>
        {!gridView && <BasicAssetView/>}
        {gridView && <div style={{ background: '#ECECEC', padding: '30px' }}><CompleteAssetsView/></div>}
      </Col>
    </Row>
    </Spin>
    );
  }
}

AssetDetailFeedFrom.contextTypes = {
  router: PropTypes.object.isRequired,
};

AssetDetailFeedFrom.propTypes = {
  form: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    assetDetails: state.get('userInfo').get('assetDetails'),
  };
}

const WrappedAssetDetailFeedFrom = Form.create()(AssetDetailFeedFrom);

export default withRouter(connect(mapStateToProps)(WrappedAssetDetailFeedFrom));
// export default withRouter(WrappedAssetDetailFeedFrom);