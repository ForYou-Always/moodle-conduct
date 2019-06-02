import React from 'react';
import  PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Table, Input, Button, Icon } from 'antd';
import * as assetActions from '../../../actions/actions';
import { userDetailColumns } from './const';

class CompleteUserDetails extends React.Component {
  state = {
      assetDetailData: [],
      bootAddUser: false,
  };

  /*componentWillMount() {
    this.props.dispatch(assetActions.fetchAssetDetail());
  }*/
  
  componentWillMount() {
    this.props.dispatch(assetActions.fetchAssetDetail());
  }
  
  componentWillReceiveProps(nextProps) {
    const { assetDetails } = nextProps;
    if(nextProps !== this.props){
      this.setState({ assetDetailData: assetDetails.toJS() });
    }
  }
  
  handleAddAsset = () => {
    this.setState({ bootAddUser: true });
  }
  
  render() {
    const { assetDetailData } = this.state;
//    const  assetDetailData  = this.props.assetDetails.toJS();
    return (<Table columns={userDetailColumns} 
      bordered style={{ backgroundColor: 'white' }}
      dataSource={assetDetailData} />
    );
  }
}

CompleteUserDetails.contextTypes = {
  router: PropTypes.object.isRequired,
};

CompleteUserDetails.propTypes = {
  form: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    assetDetails: state.get('userInfo').get('assetDetails'),
  };
}

export default withRouter(connect(mapStateToProps)(CompleteUserDetails));