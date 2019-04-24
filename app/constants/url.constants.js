const BASE_URL = 'http://192.168.1.101:9500';

export const ENDPOINTS = {
    GET_NOTES: `${BASE_URL}/get`,
    ADD_NOTE: `${BASE_URL}/add`,
    DELETE_NOTE: `${BASE_URL}/delete`,
    EDIT_NOTE: `${BASE_URL}/edit`,
    GET_ALL_TAGS: `${BASE_URL}/tags/`,
    ADD_TAG: `${BASE_URL}/tags/add`,
    DELETE_TAG: `${BASE_URL}/tags/delete`,
    GET_NOTES_BY_TAG: `${BASE_URL}/fetch-tag`
};
