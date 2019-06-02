import React from 'react';
import  PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Form, Input, InputNumber, Tooltip, Icon, Cascader, Select, Table,
  Row, Col, Checkbox, Button, AutoComplete, Radio, Spin, Card, Divider } from 'antd';
  
import * as assetActions from '../../actions/actions';
import { assetGridColumns, multiRecordColumns, cardDetailColumns, getAssetDetails, } from './const.js';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class BasicAssetView extends React.Component {
  state = {
      processing: false,
      assetDetailData: [{}]
  };
  
  componentWillMount() {
    this.props.dispatch(assetActions.fetchAssetDetail());
  }
  
  componentWillReceiveProps(nextProps) {
    const { assetDetails } = nextProps;
    if(nextProps !== this.props){
      this.setState({ assetDetailData: assetDetails.toJS() });
    }
  }
  
  render() {
    const { processing, assetDetailData } = this.state;
    
    const cpuInfo = assetDetailData.filter(record => record.type === "CPU");
    const monitorInfo = assetDetailData.filter(record => record.type === "MONITOR");
    const keyboardInfo = assetDetailData.filter(record => record.type === "KEYBOARD");
    const mouseInfo = assetDetailData.filter(record => record.type === "MOUSE");
    
    const NoInfo = "No Update";
    
    return (<Spin spinning={processing} tip="Registering Asset Please Wait...">
    <div style={{ background: '#ECECEC', padding: '30px' }}>
      <Row gutter={16} type="flex">
        <Col span={12}>
          <Card title={<div><Icon type="hdd" />  - CPU</div>} bordered={false} style={{ borderRadius:60 }}>
          {cpuInfo && cpuInfo.length===1 && 
            <Table
              showHeader={false}
              columns={cardDetailColumns}
              dataSource={getAssetDetails(cpuInfo[0])}
              bordered={false}
              size={"small"}
              pagination={false}
              style={{ backgroundColor: 'ivory', width:550, borderRadius:25 }}
            />}
            {cpuInfo && (cpuInfo.length > 1) &&
              <Table
                columns={multiRecordColumns}
                dataSource={cpuInfo}
                bordered={true}
                size={"small"}
                pagination={false}
                style={{backgroundColor: 'ivory', width:750, borderRadius:25 }}
              />            
            }
          </Card>
        </Col>
        <Col span={12}>
          <Card title={<div><Icon type="desktop" />  - MONITOR</div>} bordered={false} style={{ borderRadius:60 }}>
            {monitorInfo && monitorInfo.length===1 && 
              <Table
                showHeader={false}
                columns={cardDetailColumns}
                dataSource={getAssetDetails(monitorInfo[0])}
                bordered={false}
                size={"small"}
                pagination={false}
                style={{backgroundColor: 'ivory', width:550, borderRadius:25 }}
              />}
              {monitorInfo && (monitorInfo.length > 1) &&
                <Table
                  columns={multiRecordColumns}
                  dataSource={monitorInfo}
                  bordered={true}
                  size={"small"}
                  pagination={false}
                  style={{background: 'ivory', width:750, borderRadius:25 }}
                />            
              }
          </Card>
        </Col>
      </Row>
      <Divider dashed />
      <Row gutter={16} type="flex">
        <Col span={12}>
          <Card title={<div><Icon type="credit-card" />  - KEYBOARD</div>} bordered={false} style={{ borderRadius:60 }}>
            {keyboardInfo && keyboardInfo.length===1 && 
              <Table
                showHeader={false}
                columns={cardDetailColumns}
                dataSource={getAssetDetails(keyboardInfo[0])}
                bordered={false}
                size={"small"}
                pagination={false}
                style={{backgroundColor: 'ivory', width:550, borderRadius:25 }}
              />}
              {keyboardInfo && (keyboardInfo.length > 1) &&
                <Table
                  columns={multiRecordColumns}
                  dataSource={keyboardInfo}
                  bordered={true}
                  size={"small"}
                  pagination={false}
                  style={{backgroundColor: 'ivory', width:750, borderRadius:25 }}
                />            
              }
          </Card>
        </Col>
        <Col span={12}>
          <Card title={<div><Icon type="fork" />  - MOUSE</div>} bordered={false} style={{ borderRadius:60 }}>
            {mouseInfo && mouseInfo.length===1 && 
              <Table
                showHeader={false}
                columns={cardDetailColumns}
                dataSource={getAssetDetails(mouseInfo[0])}
                bordered={false}
                size={"small"}
                pagination={false}
                style={{backgroundColor: 'ivory', width:550, borderRadius:25 }}
              />}
              {mouseInfo && (mouseInfo.length > 1) &&
                <Table
                  columns={multiRecordColumns}
                  dataSource={mouseInfo}
                  bordered={true}
                  size={"small"}
                  pagination={false}
                  style={{backgroundColor: 'ivory', width:750, borderRadius:25 }}
                />            
              }
          </Card>
        </Col>
      </Row>
    </div></Spin>
    );
  }
}

BasicAssetView.contextTypes = {
  router: PropTypes.object.isRequired,
};

BasicAssetView.propTypes = {
  form: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    assetDetails: state.get('userInfo').get('assetDetails'),
  };
}

const WrappedBasicAssetView = Form.create()(BasicAssetView);

export default withRouter(connect(mapStateToProps)(BasicAssetView));
