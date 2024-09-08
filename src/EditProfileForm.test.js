import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import EditProfileForm from './EditProfileForm';
import AppContext from './AppContext';
import TrailsApi from './TrailsApi';
import '@testing-library/jest-dom';

jest.mock('./TrailsApi');

const mockUpdateAppData = jest.fn();
const mockUpdateAlertMsg = jest.fn();
const mockSetEditing = jest.fn();
const mockSetLoading = jest.fn();
const mockSetStorage = jest.fn();

jest.mock('./useLocalStorage', () => () => ({
    setStorage: mockSetStorage
}));

jest.mock('./helperFunctions', () => ({
    getBaseUrl: jest.fn()
}));

const user = {
    username: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
    profileImagePath: '/path/to/profile-image.jpg',
    token: 'test-token'
};

const appData = { user };

describe('EditProfileForm Component', () => {
    beforeEach(() => {
        TrailsApi.uploadImage.mockClear();
        TrailsApi.updateUsername.mockClear();
        mockUpdateAppData.mockClear();
        mockUpdateAlertMsg.mockClear();
        mockSetEditing.mockClear();
        mockSetLoading.mockClear();
    });

    test('renders form fields with user data', () => {
        render(
            <AppContext.Provider value={{ appData, updateAppData: mockUpdateAppData, updateAlertMsg: mockUpdateAlertMsg }}>
                <EditProfileForm user={user} setEditing={mockSetEditing} setLoading={mockSetLoading} />
            </AppContext.Provider>
        );

        expect(screen.getByLabelText(/First name/i)).toHaveValue('Test');
        expect(screen.getByLabelText(/Last name/i)).toHaveValue('User');
        expect(screen.getByLabelText(/email/i)).toHaveValue('testuser@example.com');
    });

    test('updates form data when inputs change', () => {
        render(
            <AppContext.Provider value={{ appData, updateAppData: mockUpdateAppData, updateAlertMsg: mockUpdateAlertMsg }}>
                <EditProfileForm user={user} setEditing={mockSetEditing} setLoading={mockSetLoading} />
            </AppContext.Provider>
        );

        fireEvent.change(screen.getByLabelText(/First name/i), { target: { value: 'Updated' } });
        expect(screen.getByLabelText(/First name/i)).toHaveValue('Updated');

        fireEvent.change(screen.getByLabelText(/Last name/i), { target: { value: 'User2' } });
        expect(screen.getByLabelText(/Last name/i)).toHaveValue('User2');
    });

    test('calls handleSubmit on submit button click', async () => {
        TrailsApi.updateUsername.mockResolvedValue({ updatedUser: user });

        render(
            <AppContext.Provider value={{ appData, updateAppData: mockUpdateAppData, updateAlertMsg: mockUpdateAlertMsg }}>
                <EditProfileForm user={user} setEditing={mockSetEditing} setLoading={mockSetLoading} />
            </AppContext.Provider>
        );

        fireEvent.click(screen.getByText(/Submit changes/i));

        await waitFor(() => {
            expect(TrailsApi.updateUsername).toHaveBeenCalledWith('testuser', expect.any(Object), 'test-token');
            expect(mockSetStorage).toHaveBeenCalledWith('user', user, true);
            expect(mockUpdateAppData).toHaveBeenCalledWith('user', user);
            expect(mockUpdateAlertMsg).toHaveBeenCalledWith('success', "Test User's profile was updated.");
            expect(mockSetLoading).toHaveBeenCalledWith(false);
            expect(mockSetEditing).toHaveBeenCalledWith(false);
        });
    });

    test('calls handleCancel on cancel button click', () => {
        render(
            <AppContext.Provider value={{ appData, updateAppData: mockUpdateAppData, updateAlertMsg: mockUpdateAlertMsg }}>
                <EditProfileForm user={user} setEditing={mockSetEditing} setLoading={mockSetLoading} />
            </AppContext.Provider>
        );

        fireEvent.click(screen.getByText(/Cancel/i));

        expect(screen.getByLabelText(/First name/i)).toHaveValue('Test');
        expect(mockSetEditing).toHaveBeenCalledWith(false);
    });

    test('uploads a new profile image when a file is selected', async () => {
        const mockFile = new File(['(⌐□_□)'], 'cool-image.png', { type: 'image/png' });
        TrailsApi.uploadImage.mockResolvedValue('/path/to/new-image.jpg');

        render(
            <AppContext.Provider value={{ appData, updateAppData: mockUpdateAppData, updateAlertMsg: mockUpdateAlertMsg }}>
                <EditProfileForm user={user} setEditing={mockSetEditing} setLoading={mockSetLoading} />
            </AppContext.Provider>
        );

        fireEvent.change(screen.getByLabelText(/Upload new profile image/i), { target: { files: [mockFile] } });

        fireEvent.click(screen.getByText(/Submit changes/i));

        await waitFor(() => {
            expect(TrailsApi.uploadImage).toHaveBeenCalled();
            expect(TrailsApi.updateUsername).toHaveBeenCalledWith('testuser', expect.objectContaining({
                profileImagePath: '/path/to/new-image.jpg'
            }), 'test-token');
        });
    });
});
