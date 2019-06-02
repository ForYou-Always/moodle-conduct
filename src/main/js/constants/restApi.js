export const HTTP_JSON_HEADER = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const GET = {
  headers: HTTP_JSON_HEADER,
  method: 'GET',
};

export function buildPostMapping(param) {
  const postData = {
    method: 'POST',
    headers: HTTP_JSON_HEADER,
  };
  if (param) {
    postData.body = JSON.stringify(param);
  }
  return postData;
}


export function buildPutMapping(param) {
  const putData = {
    method: 'PUT',
    headers: HTTP_JSON_HEADER,
  };
  if (param) {
    putData.body = JSON.stringify(param);
  }
  return putData;
}

export const DELETE = {
  headers: HTTP_JSON_HEADER,
  method: 'DELETE',
};
