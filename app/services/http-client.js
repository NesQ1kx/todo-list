import axios from 'axios';

export const httpClient = function() {
    return {
        get: function (url) {
            return axios.get(url);
        },

        post: function (url, data) {
            return axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }
}();
