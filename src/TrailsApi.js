import axios from 'axios';
import { getBaseUrl, getTestKey } from './helperFunctions';



class TrailsApi {

    static baseUrl = getBaseUrl();

    static handleResponse = (response) => response.data;
    static handleError = (error) => {
        console.error('API call error:', error);
        if (error.response.data)
            throw new Error(error.response.data.error.message);
    };

    static async login(data) {
        return axios.post(`${this.baseUrl}/auth/login`, data)
            .then(TrailsApi.handleResponse)
            .catch(TrailsApi.handleError);
    }

    static async register(data) {
        return axios.post(`${this.baseUrl}/auth/register`, data)
            .then(TrailsApi.handleResponse)
            .catch(TrailsApi.handleError);
    }

    static async getUsername(username, token) {
        return axios.get(`${this.baseUrl}/users/${username}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(TrailsApi.handleResponse)
            .catch(TrailsApi.handleError);
    }

    static async updateUsername(username, data, token) {
        return axios.patch(`${this.baseUrl}/users/${username}`, data, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(TrailsApi.handleResponse)
            .catch(TrailsApi.handleError);
    }

    static async getUserTrailStats(username, token) {
        return axios.get(`${this.baseUrl}/users/${username}/stats`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(TrailsApi.handleResponse)
            .catch(TrailsApi.handleError);
    }

    static async deleteUsername(username, token) {
        return axios.delete(`${this.baseUrl}/users/${username}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(TrailsApi.handleResponse)
            .catch(TrailsApi.handleError);
    }

    static async addTrailToWishlist(username, trailId, token) {
        return axios.post(`${this.baseUrl}/users/${username}/wishlist/${trailId}`, {}, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(TrailsApi.handleResponse)
            .catch(TrailsApi.handleError);
    }

    static async removeTrailFromWishlist(username, trailId, token) {
        return axios.delete(`${this.baseUrl}/users/${username}/wishlist/${trailId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(TrailsApi.handleResponse)
            .catch(TrailsApi.handleError);
    }

    static async getWishlist(username, token) {
        return axios.get(`${this.baseUrl}/users/${username}/wishlist`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(TrailsApi.handleResponse)
            .catch(TrailsApi.handleError);
    }

    static async addTrailToCompleted(username, trailId, token) {
        return axios.post(`${this.baseUrl}/users/${username}/completed/${trailId}`, {}, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(TrailsApi.handleResponse)
            .catch(TrailsApi.handleError);
    }

    static async removeTrailFromCompleted(username, trailId, token) {
        return axios.delete(`${this.baseUrl}/users/${username}/completed/${trailId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(TrailsApi.handleResponse)
            .catch(TrailsApi.handleError);
    }

    static async getCompletedTrails(username, token) {
        return axios.get(`${this.baseUrl}/users/${username}/completed`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(TrailsApi.handleResponse)
            .catch(TrailsApi.handleError);
    }

    static async search(term, page, limit, filters) {
        const params = new URLSearchParams();
        if (term) params.append('searchTerm', term);
        if (page) params.append('page', page);
        if (limit) params.append('limit', limit);
        if (filters && Object.keys(filters).length > 0) params.append('filters', filters);
        return axios.get(`${this.baseUrl}/trails/search?${params.toString()}`)
            .then(TrailsApi.handleResponse)
            .catch(TrailsApi.handleError);
    }

    static async loggedInSearch(user, term, page, limit, filters) {
        const params = new URLSearchParams();
        if (term) params.append('searchTerm', term);
        if (page) params.append('page', page);
        if (limit) params.append('limit', limit);
        if (filters && Object.keys(filters).length > 0) params.append('filters', filters);
        return axios.get(`${this.baseUrl}/trails/search/${user.username}?${params.toString()}`, {
            headers: { 'Authorization': `Bearer ${user.token}` },
        })
            .then(TrailsApi.handleResponse)
            .catch(TrailsApi.handleError);
    }

    static async getTrailByIdAnon(trailId) {
        return axios.get(`${this.baseUrl}/trails/${trailId}`)
            .then(TrailsApi.handleResponse)
            .catch(TrailsApi.handleError);
    }

    static async getTrailById(username, trailId, token) {
        return axios.get(`${this.baseUrl}/trails/${trailId}/${username}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(TrailsApi.handleResponse)
            .catch(TrailsApi.handleError);
    }

    static async uploadImage(data) {
        return axios.post(`${this.baseUrl}/upload`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then((response) => response.data.filePath)
            .catch((error) => {
                console.error('Error uploading file:', error);
                return '/assets/profile-placeholder.png';
            });
    }

    static async testing(bool, key) {
        const testKey = getTestKey()
        if (key === testKey) {
            return axios.post(`${this.baseUrl}/auth/testing/${bool}`)
                .then(TrailsApi.handleResponse)
                .catch(TrailsApi.handleError)
        }
    }
}

export default TrailsApi;