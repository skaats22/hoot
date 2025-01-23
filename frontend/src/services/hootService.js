import sendRequest from './sendRequest';

const BASE_URL = '/api/hoots';

export function index() {
  return sendRequest(BASE_URL);
}

export function show(hootId) {
  return sendRequest(`${BASE_URL}/${hootId}`);
}

export function create(hootFormData) {
  return sendRequest(BASE_URL, 'POST', hootFormData);
}

export function deleteHoot(hootId) {
  return sendRequest(`${BASE_URL}/${hootId}`, 'DELETE');
}

export function update(hootId, hootFormData) {
  return sendRequest(`${BASE_URL}/${hootId}`, 'PUT', hootFormData);
}

export function createComment(hootId, commentFormData) {
  return sendRequest(
    `${BASE_URL}/${hootId}/comments`,
    'POST',
    commentFormData
  );
}

export function deleteComment(hootId, commentId) {
  return sendRequest(`${BASE_URL}/${hootId}/comments/${commentId}`, 'DELETE');
}

export function updateComment(hootId, commentId, commentFormData) {
  return sendRequest(
    `${BASE_URL}/${hootId}/comments/${commentId}`, 
    'PUT',
    commentFormData
  );
}
