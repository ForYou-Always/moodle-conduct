//import {fetch} from "../common/fetch"
function responseInterceptor(response) {

    if (response.status === 401) {
        var toUrl = response.headers.get('auth-url');
        var fromUrl = encodeURIComponent(window.location.href);
        window.location.href = toUrl + "?from=" + fromUrl;
    }
    
    if(response.status === 301 && response.headers.get('redirect-url') !== null) {
      window.location.href = response.headers.get('redirect-url');
      return response;
    }

    if (response.status === 403) {
        alert("You don't have permission to perform this action, please contact admin.");
    }

    if (response.status === 500) {
        var error = new Error(response.statusText);
        error.response = response;
        response.json().then((response)=>{
            if (response.message !== undefined){
                alert(response.message);
            }
        });
    }

    if (!response.ok) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }

    return response;
}

var originalFetch = window.fetch;

export function fetch (request, init) {

    if (!!init) {
        init.credentials = 'same-origin';
    } else {
        init = {
            credentials: 'same-origin'
        };
    }

    return originalFetch(request, init).then(responseInterceptor);

}
