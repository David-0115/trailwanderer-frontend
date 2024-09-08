import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';
import AppContext from './AppContext';
import TrailsApi from './TrailsApi';
import '@testing-library/jest-dom';


jest.mock('./TrailsApi');
jest.mock('./Loader', () => () => <div data-testid="loader">Loading...</div>);
jest.mock('./materials/TwButton', () => ({ setLocalUser }) => (
    <button data-testid="tw-button" onClick={() => setLocalUser(true)}>
        Register with Email
    </button>
));
jest.mock('./materials/GoogleButton', () => ({ handleGoogle }) => (
    <button data-testid="google-button" onClick={handleGoogle}>
        Register with Google
    </button>
));
jest.mock('./materials/FacebookButton', () => ({ handleFacebook }) => (
    <button data-testid="facebook-button" onClick={handleFacebook}>
        Register with Facebook
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

beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

describe('Register Component', () => {
    const mockUpdateAlertMsg = jest.fn();
    const mockUpdateAppData = jest.fn();

    const mockContextValue = {
        updateAlertMsg: mockUpdateAlertMsg,
        updateAppData: mockUpdateAppData,
    };


    test('renders the registration options by default', () => {
        render(
            <BrowserRouter>
                <AppContext.Provider value={mockContextValue}>
                    <Register />
                </AppContext.Provider>
            </BrowserRouter>
        );

        expect(screen.getByText(/welcome to trail wanderer/i)).toBeInTheDocument();
        expect(screen.getByText(/please choose your registration type/i)).toBeInTheDocument();
        expect(screen.getByTestId('tw-button')).toBeInTheDocument();
        expect(screen.getByTestId('google-button')).toBeInTheDocument();
        expect(screen.getByTestId('facebook-button')).toBeInTheDocument();
    });

    test('displays the registration form when "Register with Email" is clicked', () => {
        render(
            <BrowserRouter>
                <AppContext.Provider value={mockContextValue}>
                    <Register />
                </AppContext.Provider>
            </BrowserRouter>
        );


        fireEvent.click(screen.getByTestId('tw-button'));


        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    test('shows the loader when loading is true', () => {
        render(
            <BrowserRouter>
                <AppContext.Provider value={mockContextValue}>
                    <Register />
                </AppContext.Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('tw-button'));
        fireEvent.click(screen.getByTestId('register-button'));

        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    test('handles form submission successfully with image upload', async () => {
        const mockResponse = { token: 'mock-token' };
        TrailsApi.register.mockResolvedValueOnce(mockResponse);
        TrailsApi.uploadImage.mockResolvedValueOnce('/path/to/uploaded/image');

        render(
            <BrowserRouter>
                <AppContext.Provider value={mockContextValue}>
                    <Register />
                </AppContext.Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('tw-button'));
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Test' } });
        fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'User' } });

        const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
        fireEvent.change(screen.getByLabelText(/profile image/i), { target: { files: [file] } });

        fireEvent.click(screen.getByTestId('register-button'));

        await waitFor(() => {
            expect(TrailsApi.uploadImage).toHaveBeenCalledTimes(1);
            expect(TrailsApi.register).toHaveBeenCalledWith(expect.objectContaining({
                username: 'testuser',
                firstName: 'Test',
                lastName: 'User',
                email: 'testuser@example.com',
                profileImagePath: '/path/to/uploaded/image',
            }));
            expect(mockUpdateAppData).toHaveBeenCalledWith('user', expect.objectContaining({
                firstName: 'Test',
                lastName: 'User',
            }));
            expect(mockUpdateAlertMsg).toHaveBeenCalledWith('success', 'Account created for Test User');
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    test('handles registration errors gracefully', async () => {
        const errorMessage = 'Registration failed';


        TrailsApi.register.mockRejectedValueOnce(new Error(errorMessage));

        render(
            <BrowserRouter>
                <AppContext.Provider value={mockContextValue}>
                    <Register />
                </AppContext.Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('tw-button'));
        fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Test' } });
        fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'User' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByTestId('register-button'));

        await waitFor(() => {

            expect(mockUpdateAlertMsg).toHaveBeenCalledWith('error', errorMessage);
        });
    });

});
