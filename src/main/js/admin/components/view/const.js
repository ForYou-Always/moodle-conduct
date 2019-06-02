import React from 'react';
import { Button, Icon } from 'antd';

export const userDetailColumns = [
  {
    title: 'Mail Id',
    dataIndex: 'mailId',
    key: 'mailId',
  }, {
    title: 'Location',
    key: 'location',
    render: (text, record) => (<Button type="primary" icon="edit" />),
  }, {
    title: 'Roles',
    key: 'roles',
    render: (text, record) => (<Button type="primary" icon="edit" />),
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
