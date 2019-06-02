import { restCall } from '../rest/restCall';
import * as ActionTypes from './actionTypes';
import * as RestApi from '../constants/restApi';
import * as EndPoint from '../constants/endPoints';

const SERVER_CONTEXT_PATH = '.';
const HTTP_JSON_HEADER = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
};

export function signUpNewUser(request) {
	const url = `${SERVER_CONTEXT_PATH}/user/sign-up/`;
	return dispatch => {
//		dispatch({
//			type: ActionTypes.REQUEST_USER_CREDENTIAL,
//		});
		return restCall(url, {
			method: 'POST',
			headers: HTTP_JSON_HEADER,
			body: JSON.stringify(request),
		})
		.then(response => response.json())
		.then(data => dispatch({
			type: ActionTypes.RECEIVE_USER_CREDENTIAL,
			data,
		}));
	};
}

export function loginUser(request) {
	const url = `${SERVER_CONTEXT_PATH}/user/login/`;
	return dispatch => {
//		dispatch({
//			type: ActionTypes.REQUEST_USER_CREDENTIAL,
//		});
		return restCall(url, {
			method: 'POST',
			headers: HTTP_JSON_HEADER,
			body: JSON.stringify(request),
		})
		.then(response => response.json())
		.then(data => dispatch({
			type: ActionTypes.RECEIVE_USER_CREDENTIAL,
			data,
		}));
	};
}


export function logoutUser(request) {
	const url = `${SERVER_CONTEXT_PATH}/logout/`;
	return dispatch => {
		return restCall(url,{
			method: 'GET',
		}).then(data => console.log(JSON.stringify(data)));
	};
}

export function registerNewUser(request) {
	const url = `${SERVER_CONTEXT_PATH}/user/register/`;
	return dispatch => {
//		dispatch({
//			type: ActionTypes.REQUEST_USER_CREDENTIAL,
//		});
		return restCall(url, {
			method: 'POST',
			headers: HTTP_JSON_HEADER,
			body: JSON.stringify(request),
		})
		.then(response => response.json())
		.then(data => dispatch({
			type: ActionTypes.RECEIVE_USER_CREDENTIAL,
			data,
		}));
	};
}



export function authenticateUser() {
	const url = `${SERVER_CONTEXT_PATH}/user/credential/authenticate`;
	return dispatch => {
//		dispatch({
//			type: ActionTypes.REQUEST_USER_AUTHORITY_INFO,
//		});
		return restCall(url,{
			method: 'GET',
		})
		.then(response => response.json())
		.then(data => dispatch({
			type: ActionTypes.RECEIVE_USER_AUTHORITY_INFO,
			data,
		})
		);
	};
}

export function fetchLocationInfo(locationId) {
	return (dispatch) => {
//		dispatch({
//			type: ActionTypes.REQUEST_LOCATION_DETAIL,
//		});
		return restCall(`${EndPoint.LOCATION_DETAILS}${locationId}`)
		.then(response => response.json())
		.then(data => dispatch({
			type: ActionTypes.RECEIVE_LOCATION_DETAIL,
			data,
		}));
	};
}

export function fetchUserDetail() {
	const url = `${SERVER_CONTEXT_PATH}/user/details/`;
	return (dispatch) => {
//		dispatch({
//			type: ActionTypes.REQUEST_USER_DETAIL,
//		});
		return restCall(url)
		.then(response => response.json())
		.then(data => dispatch({
			type: ActionTypes.RECEIVE_USER_DETAIL,
			data,
		}));
	};
}

export function fetchAssetDetail() {
	const url = `${SERVER_CONTEXT_PATH}/asset/details/`;
	return (dispatch) => {
//		dispatch({
//			type: ActionTypes.REQUEST_ASSET_DETAIL,
//		});
		return restCall(url)
		.then(response => response.json())
		.then(data => dispatch({
			type: ActionTypes.RECEIVE_ASSET_DETAIL,
			data,
		}));
	};
}

export function fetchDistinctAssetDetail(request) {
	const url = `${SERVER_CONTEXT_PATH}/asset/details/distinct`;
	return dispatch => {
//		dispatch({
//			type: ActionTypes.REQUEST_DISTINCT_ASSET_DETAIL,
//		});
		return restCall(url)
		.then(response => response.json())
		.then(data => dispatch({
			type: ActionTypes.RECEIVE_DISTINCT_ASSET_DETAIL,
			data,
		}));
	};
}

export function addUserDetail(request) {
	const url = `${SERVER_CONTEXT_PATH}/user/details/`;
	return dispatch => {
//		dispatch({
//			type: ActionTypes.REQUEST_USER_DETAIL,
//		});
		return restCall(url, {
			method: 'POST',
			headers: HTTP_JSON_HEADER,
			body: JSON.stringify(request),
		})
		.then(response => response.json())
		.then(data => dispatch({
			type: ActionTypes.RECEIVE_USER_DETAIL,
			data,
		}));
	};
}

export function addAssetDetail(request) {
	Object.keys(request).forEach((val) => {
		if(val!=='mailId'){
			request[val] = request[val].toUpperCase()
		}
	});
	const url = `${SERVER_CONTEXT_PATH}/asset/details/`;
	return dispatch => {
//		dispatch({
//			type: ActionTypes.REQUEST_USER_DETAIL,
//		});
		return restCall(url, {
			method: 'POST',
			headers: HTTP_JSON_HEADER,
			body: JSON.stringify(request),
		})
		.then(response => response.json())
		.then(data => dispatch({
			type: ActionTypes.RECEIVE_ASSET_DETAIL,
			data,
		}));
	};
}
	
//	export function addAwsImages(request) {
//	  dispatch({ type: ActionTypes.RECEIVE_AWS_IMAGE, request});
//	}