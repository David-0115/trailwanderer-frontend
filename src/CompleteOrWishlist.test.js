import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CompleteOrWishlist from './CompleteOrWishlist';
import AppContext from './AppContext';
import TrailsApi from './TrailsApi';
import { getBaseUrl } from './helperFunctions';
import '@testing-library/jest-dom';



jest.mock('./TrailsApi');
jest.mock('./materials/TrailCard', () => () => <div data-testid="trail-card" />);
jest.mock('./TrailDetail', () => () => <div data-testid="trail-detail" />);
jest.mock('./Loader', () => () => <div data-testid="loader" />);
jest.mock('./helperFunctions', () => ({
    getBaseUrl: jest.fn()
}));

describe('CompleteOrWishlist Component', () => {
    const mockUpdateAlertMsg = jest.fn();

    const mockContextValue = {
        appData: {
            user: {
                username: 'testuser',
                token: 'testtoken',
                firstName: 'Test',
                showTrailModal: false,
            },
        },
        updateAlertMsg: mockUpdateAlertMsg,
    };

    beforeEach(() => {

        jest.clearAllMocks();

        getBaseUrl.mockReturnValue('http://localhost:3001');
    });

    test('renders Loader component while fetching trails', () => {
        TrailsApi.getCompletedTrails.mockResolvedValueOnce([]);
        render(
            <AppContext.Provider value={mockContextValue}>
                <CompleteOrWishlist dataType="completed" />
            </AppContext.Provider>
        );

        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    test('renders completed trails when data is available', async () => {
        const mockCompletedTrails = { completedList: [{ id: 1, name: 'Trail 1' }] };
        TrailsApi.getCompletedTrails.mockResolvedValueOnce(mockCompletedTrails);

        render(
            <AppContext.Provider value={mockContextValue}>
                <CompleteOrWishlist dataType="completed" />
            </AppContext.Provider>
        );

        await waitFor(() => expect(screen.getByTestId('trail-card')).toBeInTheDocument());
        expect(screen.getByText("Test's Completed Trails:")).toBeInTheDocument();
    });

    test('renders wishlist trails when data is available', async () => {
        const mockWishlist = { wishlist: [{ id: 2, name: 'Trail 2' }] };
        TrailsApi.getWishlist.mockResolvedValueOnce(mockWishlist);

        render(
            <AppContext.Provider value={mockContextValue}>
                <CompleteOrWishlist dataType="wishlist" />
            </AppContext.Provider>
        );

        await waitFor(() => expect(screen.getByTestId('trail-card')).toBeInTheDocument());
        expect(screen.getByText("Test's Trail Wishlist:")).toBeInTheDocument();
    });

    test('handles error while fetching completed trails', async () => {
        const errorMsg = 'Error retrieving completed trails';
        TrailsApi.getCompletedTrails.mockRejectedValueOnce(new Error(errorMsg));

        render(
            <AppContext.Provider value={mockContextValue}>
                <CompleteOrWishlist dataType="completed" />
            </AppContext.Provider>
        );

        await waitFor(() => expect(mockUpdateAlertMsg).toHaveBeenCalledWith('error', errorMsg));
    });

    test('handles empty completed trails or wishlist', async () => {
        TrailsApi.getCompletedTrails.mockResolvedValueOnce({ completedList: [] });

        render(
            <AppContext.Provider value={mockContextValue}>
                <CompleteOrWishlist dataType="completed" />
            </AppContext.Provider>
        );

        await waitFor(() => {

            expect(screen.getByText(/No completed trails for Test/i)).toBeInTheDocument();
        });
    });
});
