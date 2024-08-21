import axios from 'axios';
import storageService from './storage.service';

class HttpService {
    async get(uri, options = { headers: {}, params: {}, body: {} }) {
        return await this.request('GET', uri, options);
    }

    async post(uri, options = { headers: {}, params: {}, body: {} }) {
        return await this.request('POST', uri, options);
    }

    async patch(uri, options = { headers: {}, params: {}, body: {} }) {
        return await this.request('PATCH', uri, options);
    }

    async delete(uri, options = { headers: {}, params: {}, body: {} }) {
        return await this.request('DELETE', uri, options);
    }

    async request(method, uri, options = { headers: {}, params: {}, body: {} }, isJson = true) {
        return await axios.request({
            method: method,
            url: uri,
            headers:
                isJson === true
                    ? this.generateHttpHeaders(options.headers)
                    : this.generateHttpHeadersFormData(options.headers),
            params: options.params,
            data: options.body,
        });
    }

    generateHttpHeaders(headerInfo) {
        const token = storageService.getAccessToken();
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        };

        if (headerInfo) {
            for (const item of Object.keys(headerInfo)) {
                headers[item] = headerInfo[item];
            }
        }
        return headers;
    }

    generateHttpHeadersFormData(headerInfo) {
        const token = storageService.getAccessToken();
        const headers = {
            ...(token && { Authorization: `Bearer ${token}` }),
        };

        if (headerInfo) {
            for (const item of Object.keys(headerInfo)) {
                headers[item] = headerInfo[item];
            }
        }
        return headers;
    }
}

export default HttpService;
