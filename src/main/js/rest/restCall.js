import { message as antMessage } from 'antd';

export function restCall (request, init) {
  
  if (!!init) {
    init.credentials = 'same-origin'; // Same url location i.e current serving url.
  } else {
    init = {
        credentials: 'same-origin'
    };
  }
  
  return window.fetch(request, init).then(processServedResult);
}

function processServedResult(response) {
  const { status, headers, ok, statusText, message } = response;
  
  switch (status){
  case 301:
    if(headers.get('redirect-url') !== null){
      window.location.href = headers.get('redirect-url');
      return response;
    }
    break;
    
  case 401:
    const toUrl = headers.get('auth-url');
    const fromUrl = encodeURIComponent(window.location.href);
    window.location.href = toUrl + "?from=" + fromUrl;
    break;
    
  case 403:
//    message.info("You don't have permission to perform this action, please contact admin.");
    alert("You don't have permission to perform this action, please contact admin.");
    break;
    
  case 500:
    const error = new Error(statusText);
    error.response = response;
    throw error;
    break;
    
    default:
      if(!ok){
        const error = new Error(statusText);
        error.response = response;
//        antMessage.error(error);
        throw error;
      }
  }
  
  return response;
}
