import Immutable, { Map as immutableMap, List as immutableList } from 'immutable';
import { combineReducers } from 'redux-immutable';
import * as ActionTypes from '../../actions/actionTypes';

function userCredentials(state = immutableMap(), action) {
	switch (action.type) {
	case ActionTypes.REQUEST_USER_CREDENTIAL:
		return immutableMap();
	case ActionTypes.RECEIVE_USER_CREDENTIAL:
		return Immutable.fromJS(action.data);
	default:
		return state;
	}
}

function authorityInfo(state = immutableMap(), action) {
	switch (action.type) {
	case ActionTypes.REQUEST_USER_AUTHORITY_INFO:
		return immutableMap();
	case ActionTypes.RECEIVE_USER_AUTHORITY_INFO:
		return Immutable.fromJS(action.data);
	default:
		return state;
	}
}

function locationDetails(state = immutableMap(), action) {
	switch (action.type) {
	case ActionTypes.REQUEST_LOCATION_DETAIL:
		return immutableMap();
	case ActionTypes.RECEIVE_LOCATION_DETAIL:
		return Immutable.fromJS(action.data);
	default:
		return state;
	}
}

function userDetails(state = immutableMap(), action) {
	switch (action.type) {
	case ActionTypes.REQUEST_USER_DETAIL:
		return immutableMap();
	case ActionTypes.RECEIVE_USER_DETAIL:
		return Immutable.fromJS(action.data);
	default:
		return state;
	}
}

function assetDetails(state = immutableList(), action) {
	switch (action.type) {
	case ActionTypes.REQUEST_ASSET_DETAIL:
		return immutableList();
	case ActionTypes.RECEIVE_ASSET_DETAIL:
		return Immutable.fromJS(action.data);
	default:
		return state;
	}
}


function distinctAssetDetails(state = immutableList(), action) {
	switch (action.type) {
	case ActionTypes.REQUEST_DISTINCT_ASSET_DETAIL:
		return immutableList();
	case ActionTypes.RECEIVE_DISTINCT_ASSET_DETAIL:
		return Immutable.fromJS(action.data);
	default:
		return state;
	}
}

function getAwsImages(state = immutableList(), action) {
  switch (action.type) {
  case ActionTypes.RECEIVE_AWS_IMAGE:
    return Immutable.fromJS(action.data);
  default:
    return state;
  }
}

export default combineReducers({
	userCredentials,
	authorityInfo,
	locationDetails,
	userDetails,
	assetDetails,
	distinctAssetDetails,
	getAwsImages
});
