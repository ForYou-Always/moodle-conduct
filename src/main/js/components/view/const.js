import React from 'react';
import { Button, Icon } from 'antd';

export const assetGridColumns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'assetType',
  }, {
    title: 'Name',
    dataIndex: 'name',
    key: 'assetName',
  }, {
    title: 'Make',
    dataIndex: 'make',
    key: 'make',
  }, {
    title: 'Model',
    dataIndex: 'model',
    key: 'model',
  }, {
    title: 'Sl.No',
    dataIndex: 'serialNo',
    key: 'serialNo',
  }, {
    title: 'Edit',
    key: 'action',
    render: (text, record) => (<Button type="primary" icon="edit" />),
  }];
  
  const viewStyles = {
    title: {
      fontFamily: '-webkit-body',
      fontVariant: 'small-caps'
    }
  }

export const cardDetailColumns = [{
	  dataIndex: 'fieldType'
	}, {
	  dataIndex: 'fieldValue'
	}];
	
	
export const multiRecordColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'assetName',
    width:120
  }, {
    title: 'Make',
    dataIndex: 'make',
    key: 'make',
    width:100
  }, {
    title: 'Model',
    dataIndex: 'model',
    key: 'model',
    width:130
  }, {
    title: 'Sl.No',
    dataIndex: 'serialNo',
    key: 'serialNo',
    width:150
  }, {
    title: 'Updated By',
    dataIndex: 'updateUser',
    key: 'updateUser',
    width:110,
    render: (text, record) => record.updateUser? record.updateUser.split('@')[0]:"",
  }, {
    title: 'Updated On',
    dataIndex: 'updateDate',
    key: 'updateDate',
    render: (text, record) =>  record.updateDate? (new Date(record.updateDate)).toUTCString():"",
  }];
	
export function getBasicDetails(userDetails){

  const { mailId, domainName, empId, createUser, createDate } = userDetails;
  const dateVal = createDate? new Date(createDate):"";
  const addedBy = createUser? createUser.split('@')[0]:"";
  
  const basicDetail = [{
	  fieldType:<div style={viewStyles.title} >Mail</div>,
	  fieldValue: <a style={{ fontStyle: 'italic'}} >{mailId}   <Icon type="mail" /> </a>,
	}, {
	  fieldType:<div style={viewStyles.title} >Employee Id</div>,
	  fieldValue:empId,
	}, {
	  fieldType:<div style={viewStyles.title} >Domain Name</div>,
	  fieldValue:domainName,
	}, {
	  fieldType:<div style={viewStyles.title} >Added By</div>,
	  fieldValue:addedBy,
	}/* , {
	  fieldType:<div style={viewStyles.title} >Added On</div>,
	  fieldValue:dateVal.toString(),
	} */];
	return basicDetail;
}

export function getSeatingInfo(userDetails){

  const { branch, floor, seatNo, place } = userDetails;
  
  const seatingDetail = [{
	  fieldType:<div style={viewStyles.title} >Seat No</div>,
	  fieldValue:seatNo,
	}, {
	  fieldType:<div style={viewStyles.title} >Floor</div>,
	  fieldValue:floor,
	}, {
	  fieldType:<div style={viewStyles.title} >Branch</div>,
	  fieldValue:branch? branch.toUpperCase():"",
	}, {
	  fieldType:<div style={viewStyles.title} >Location</div>,
	  fieldValue:place? place.toUpperCase():"",
	}];
	return seatingDetail;
}

export function getAssetDetails(assetDetailData){

  const { name, make, model, serialNo, updateDate, updateUser } = assetDetailData;
  
  const dateVal = updateDate? new Date(updateDate):"";
  const updatedBy = updateUser? updateUser.split('@')[0]:"";
  
  const cpuDetail = [{
	  fieldType:<div style={viewStyles.title} >Name</div>,
	  fieldValue:name,
	}, {
	  fieldType:<div style={viewStyles.title} >Make</div>,
	  fieldValue:make,
	},  {
	  fieldType:<div style={viewStyles.title} >Model</div>,
	  fieldValue:model,
	},  {
	  fieldType:<div style={viewStyles.title} >Serial No</div>,
	  fieldValue:serialNo,
	},  {
	  fieldType:<div style={viewStyles.title} >Updated By</div>,
	  fieldValue:updatedBy,
	}, {
	  fieldType:<div style={viewStyles.title} >Updated On</div>,
	  fieldValue:dateVal.toString(),
	}];
	return cpuDetail;
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	