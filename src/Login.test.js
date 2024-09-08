import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import AppContext from './AppContext';
import TrailsApi from './TrailsApi';
import '@testing-library/jest-dom';


jest.mock('./TrailsApi');
jest.mock('./Loader', () => () => <div data-testid="loader">Loading...</div>);
jest.mock('./materials/TwButton', () => ({ setLocalUser }) => (
    <button data-testid="tw-button" onClick={() => setLocalUser(true)}>
        Login with Email
    </button>
));
jest.mock('./materials/GoogleButton', () => ({ handleGoogle }) => (
    <button data-testid="google-button" onClick={handleGoogle}>
        Login with Google
    </button>
));
jest.mock('./materials/FacebookButton', () => ({ handleFacebook }) => (
    <button data-testid="facebook-button" onClick={handleFacebook}>
        Login with Facebook
    </button>
));
jest.mock('./helperFunctions', () => ({
    getAuthUrl: jest.fn(() => 'http://mock-backend-url.com'),
    getBaseUrl: jest.fn(() => 'http://mock-backend-url.com')
}));


const mockNavigate = jest.fn();

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
    const mockUpdateAlertMsg = jest.fn();
    const mockUpdateAppData = jest.fn();

    const mockContextValue = {
        updateAlertMsg: mockUpdateAlertMsg,
        updateAppData: mockUpdateAppData,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the login options by default', () => {
        render(
            <BrowserRouter>
                <AppContext.Provider value={mockContextValue}>
                    <Login />
                </AppContext.Provider>
            </BrowserRouter>
        );

        expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
        expect(screen.getByText(/please choose your login type/i)).toBeInTheDocument();
        expect(screen.getByTestId('tw-button')).toBeInTheDocument();
        expect(screen.getByTestId('google-button')).toBeInTheDocument();
        expect(screen.getByTestId('facebook-button')).toBeInTheDocument();
    });

    test('displays the login form when "Login with Email" is clicked', () => {
        render(
            <BrowserRouter>
                <AppContext.Provider value={mockContextValue}>
                    <Login />
                </AppContext.Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('tw-button'));

        expect(screen.getByText(/welcome back to trail wanderer/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    test('shows the loader when loading is true', () => {
        render(
            <BrowserRouter>
                <AppContext.Provider value={mockContextValue}>
                    <Login />
                </AppContext.Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('tw-button'));
        fireEvent.click(screen.getByText(/login/i));

        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    test('handles form submission successfully', async () => {
        const mockResponse = { token: 'mock-token' };
        const mockUserResponse = { user: { username: 'testuser', firstName: 'Test', lastName: 'User', token: 'mock-token' } };

        TrailsApi.login.mockResolvedValueOnce(mockResponse);
        TrailsApi.getUsername.mockResolvedValueOnce(mockUserResponse);

        render(
            <BrowserRouter>
                <AppContext.Provider value={mockContextValue}>
                    <Login />
                </AppContext.Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('tw-button'));
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByText(/login/i));

        await waitFor(() => {
            expect(TrailsApi.login).toHaveBeenCalledTimes(1);
            expect(TrailsApi.getUsername).toHaveBeenCalledTimes(1);
            expect(mockUpdateAppData).toHaveBeenCalledWith('user', mockUserResponse.user);
            expect(mockUpdateAlertMsg).toHaveBeenCalledWith('success', 'Welcome back, Test!');
            expect(mockNavigate).toHaveBeenCalledWith('/');  // This line should now pass
        });
    });

    test('handles login errors gracefully', async () => {
        const errorMessage = 'Invalid credentials';
        TrailsApi.login.mockRejectedValueOnce(new Error(errorMessage));

        render(
            <BrowserRouter>
                <AppContext.Provider value={mockContextValue}>
                    <Login />
                </AppContext.Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('tw-button'));
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByText(/login/i));

        await waitFor(() => {
            expect(mockUpdateAlertMsg).toHaveBeenCalledWith('error', errorMessage);
        });
    });
});
