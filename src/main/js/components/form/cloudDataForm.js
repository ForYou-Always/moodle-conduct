import React, { Component } from 'react';
import { Table, Button, Icon , Row , Col} from 'antd';
import BizChartView from '../view/bizChartView';

class CloudDataForm extends Component{
  constructor(props){
    super(props);
    this.state = {
        viewType: 'Table'
    }
  }

  changeView = ()=>{
    const {viewType} = this.state;
    console.log('viewType',viewType);
    viewType == 'Table' ? this.setState({viewType : 'Chart'}) :  this.setState({viewType : 'Table'})
  }
  
  render(){
    const {viewType} = this.state; 
    const dataImages = [{
      virtualizationType: 'paravirtual',
      name: 'My server',
      hypervisor: 'xen',
      imageId: 'ami-5731123e',
      rootDeviceType: 'ebs',
      state: 'available',
      architecture: 'x86_64',
      imageLocation: '123456789012/My server',
      kernelId: 'aki-88aa75e1',
      ownerId: '123456789012',
      rootDeviceName:' /dev/sda1',
      publicStatus: 'false',
      imageType: 'machine',
      description: 'An AMI for my server'
    }];

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Hypervisor',
      dataIndex: 'hypervisor',
      key: 'hypervisor',
    }, {
      title: 'ImageId',
      dataIndex: 'imageId',
      key: 'imageId',
    }, {
      title: 'RootDeviceType',
      dataIndex: 'rootDeviceType',
      key: 'rootDeviceType',
    }, {
      title: 'Status',
      dataIndex: 'state',
      key: 'state',
    }, {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    }];
    return(
        <div>
        <Button onClick = {this.changeView} type="primary"> <Icon type="area-chart"/>Change View</Button>
        { viewType =='Table' && <Table columns={columns} 
        expandedRowRender={(record) => 
        <div>
        <Row>
        <Col span={12}>
        <p style={{ margin: 0 }}><b>virtualizationType : </b> {record.virtualizationType}</p><br/>
        <p style={{ margin: 0 }}><b>Architecture : </b> {record.architecture}</p><br/>
        <p style={{ margin: 0 }}><b>ImageLocation : </b> {record.imageLocation}</p><br/>
        <p style={{ margin: 0 }}><b>KernelId : </b> {record.kernelId}</p><br/>
        </Col>
        <Col span={12}>
        <p style={{ margin: 0 }}><b>OwnerId : </b> {record.ownerId}</p><br/>
        <p style={{ margin: 0 }}><b>RootDeviceName : </b> {record.rootDeviceName}</p><br/>
        <p style={{ margin: 0 }}><b>PublicStatus : </b> {record.publicStatus}</p><br/>
        <p style={{ margin: 0 }}><b>ImageType : </b> {record.imageType}</p><br/>
        </Col>
        </Row>
        </div> 
        }
        dataSource={dataImages} /> 
        }
        {viewType =='Chart' &&  <BizChartView/> }
        </div>
    )
  }
}

export default CloudDataForm;