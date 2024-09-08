import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import AppContext from './AppContext';
import '@testing-library/jest-dom';


const mockNavigate = jest.fn();

jest.mock('./useLocalStorage', () => ({
    __esModule: true,
    default: () => ({
        removeStorage: jest.fn(),
    }),
}));


jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate,
}));

describe('Navbar Component', () => {
    const mockUpdateAlertMsg = jest.fn();
    const mockUpdateAppData = jest.fn();
    const mockRemoveStorage = jest.fn();

    const mockContextValue = {
        appData: {
            user: {
                firstName: 'Test',
                profileImagePath: '/path/to/profile.jpg',
            },
        },
        updateAppData: mockUpdateAppData,
        updateAlertMsg: mockUpdateAlertMsg,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the app bar with user avatar when user is logged in', () => {
        render(
            <BrowserRouter>
                <AppContext.Provider value={mockContextValue}>
                    <Navbar />
                </AppContext.Provider>
            </BrowserRouter>
        );

        expect(screen.getByAltText('Profile Image')).toBeInTheDocument();
    });

    test('opens user menu when avatar is clicked', () => {
        render(
            <BrowserRouter>
                <AppContext.Provider value={mockContextValue}>
                    <Navbar />
                </AppContext.Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByAltText('Profile Image'));

        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Completed')).toBeInTheDocument();
        expect(screen.getByText('Wishlist')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    test('handles logout when "Logout" is clicked', () => {
        render(
            <BrowserRouter>
                <AppContext.Provider value={mockContextValue}>
                    <Navbar />
                </AppContext.Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByAltText('Profile Image'));
        fireEvent.click(screen.getByText('Logout'));


        expect(mockUpdateAppData).toHaveBeenCalledWith('user', null);
        expect(mockUpdateAlertMsg).toHaveBeenCalledWith('info', 'Test has been logged out. ');
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    test('navigates to profile when "Profile" is clicked', () => {
        render(
            <BrowserRouter>
                <AppContext.Provider value={mockContextValue}>
                    <Navbar />
                </AppContext.Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByAltText('Profile Image'));
        fireEvent.click(screen.getByText('Profile'));

        expect(mockNavigate).toHaveBeenCalledWith('/profile');
    });

    test('navigates to completed trails when "Completed" is clicked', () => {
        render(
            <BrowserRouter>
                <AppContext.Provider value={mockContextValue}>
                    <Navbar />
                </AppContext.Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByAltText('Profile Image'));
        fireEvent.click(screen.getByText('Completed'));

        expect(mockNavigate).toHaveBeenCalledWith('/completed');
    });

    test('navigates to wishlist when "Wishlist" is clicked', () => {
        render(
            <BrowserRouter>
                <AppContext.Provider value={mockContextValue}>
                    <Navbar />
                </AppContext.Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByAltText('Profile Image'));
        fireEvent.click(screen.getByText('Wishlist'));

        expect(mockNavigate).toHaveBeenCalledWith('/wishlist');
    });
});
