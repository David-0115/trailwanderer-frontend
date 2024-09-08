import axios from 'axios';
import TrailsApi from './TrailsApi';
import { getBaseUrl, getTestKey } from './helperFunctions';

jest.mock('axios');
jest.mock('./helperFunctions', () => ({
    getBaseUrl: jest.fn(() => 'http://mock-api-url.com'),
    getTestKey: jest.fn(() => 'mock-test-key'),
}));

describe('TrailsApi', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should return token on successful login', async () => {
            const mockData = { token: 'mock-token' };
            axios.post.mockResolvedValueOnce({ data: mockData });

            const result = await TrailsApi.login({ username: 'testuser', password: 'password' });

            expect(result).toEqual(mockData);
            expect(axios.post).toHaveBeenCalledWith('http://mock-api-url.com/auth/login', { username: 'testuser', password: 'password' });
        });

        it('should throw an error on failed login', async () => {
            const mockError = { response: { data: { error: { message: 'Invalid credentials' } } } };
            axios.post.mockRejectedValueOnce(mockError);

            await expect(TrailsApi.login({ username: 'testuser', password: 'wrongpassword' }))
                .rejects
                .toThrow('Invalid credentials');

            expect(axios.post).toHaveBeenCalledWith('http://mock-api-url.com/auth/login', { username: 'testuser', password: 'wrongpassword' });
        });
    });

    describe('register', () => {
        it('should return token on successful registration', async () => {
            const mockData = { token: 'mock-token' };
            axios.post.mockResolvedValueOnce({ data: mockData });

            const result = await TrailsApi.register({ username: 'newuser', password: 'password', email: 'newuser@example.com' });

            expect(result).toEqual(mockData);
            expect(axios.post).toHaveBeenCalledWith('http://mock-api-url.com/auth/register', { username: 'newuser', password: 'password', email: 'newuser@example.com' });
        });

        it('should throw an error on failed registration', async () => {
            const mockError = { response: { data: { error: { message: 'User already exists' } } } };
            axios.post.mockRejectedValueOnce(mockError);

            await expect(TrailsApi.register({ username: 'existinguser', password: 'password', email: 'existinguser@example.com' }))
                .rejects
                .toThrow('User already exists');

            expect(axios.post).toHaveBeenCalledWith('http://mock-api-url.com/auth/register', { username: 'existinguser', password: 'password', email: 'existinguser@example.com' });
        });
    });

    describe('getUsername', () => {
        it('should return user data on success', async () => {
            const mockData = { username: 'testuser', firstName: 'Test', lastName: 'User' };
            axios.get.mockResolvedValueOnce({ data: mockData });

            const result = await TrailsApi.getUsername('testuser', 'mock-token');

            expect(result).toEqual(mockData);
            expect(axios.get).toHaveBeenCalledWith('http://mock-api-url.com/users/testuser', {
                headers: { 'Authorization': `Bearer mock-token` },
            });
        });

        it('should throw an error on failure', async () => {
            const mockError = { response: { data: { error: { message: 'User not found' } } } };
            axios.get.mockRejectedValueOnce(mockError);

            await expect(TrailsApi.getUsername('unknownuser', 'mock-token'))
                .rejects
                .toThrow('User not found');

            expect(axios.get).toHaveBeenCalledWith('http://mock-api-url.com/users/unknownuser', {
                headers: { 'Authorization': `Bearer mock-token` },
            });
        });
    });



    describe('uploadImage', () => {
        it('should return the file path on successful upload', async () => {
            const mockData = { filePath: '/path/to/image.png' };
            axios.post.mockResolvedValueOnce({ data: mockData });

            const file = new Blob(['dummy content'], { type: 'image/png' });
            const formData = new FormData();
            formData.append('file', file);

            const result = await TrailsApi.uploadImage(formData);

            expect(result).toEqual('/path/to/image.png');
            expect(axios.post).toHaveBeenCalledWith('http://mock-api-url.com/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        });

        it('should return a placeholder image path on failed upload', async () => {
            const mockError = new Error('Upload failed');
            axios.post.mockRejectedValueOnce(mockError);

            const file = new Blob(['dummy content'], { type: 'image/png' });
            const formData = new FormData();
            formData.append('file', file);

            const result = await TrailsApi.uploadImage(formData);

            expect(result).toEqual('/src/assets/profile-placeholder.png');
            expect(axios.post).toHaveBeenCalledWith('http://mock-api-url.com/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        });
    });
});
