import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TrailDetail from './TrailDetail';
import AppContext from './AppContext';
import TrailsApi from './TrailsApi';
import '@testing-library/jest-dom';

jest.mock('./TrailsApi');
jest.mock('./materials/WishListIcon', () => ({ onList, trailId, wishlistAdd, wishlistRemove }) => (
    <button data-testid="wishlist-icon" onClick={() => (onList ? wishlistRemove(trailId) : wishlistAdd(trailId))}>
        {onList ? 'Remove from Wishlist' : 'Add to Wishlist'}
    </button>
));
jest.mock('./materials/TrailCompleteIcon', () => ({ completed, trailId, addComplete, removeComplete }) => (
    <button data-testid="complete-icon" onClick={() => (completed ? removeComplete(trailId) : addComplete(trailId))}>
        {completed ? 'Mark as Incomplete' : 'Mark as Complete'}
    </button>
));
jest.mock('./materials/Map', () => ({ coords }) => (
    <div data-testid="map">Map with coordinates</div>
));

jest.mock('./helperFunctions', () => ({
    getAuthUrl: jest.fn(() => 'http://mock-backend-url.com'),
    getBaseUrl: jest.fn(() => 'http://mock-backend-url.com')
}));

describe('TrailDetail Component', () => {
    const mockUpdateAppData = jest.fn();
    const mockUpdateAlertMsg = jest.fn();

    const defaultAppData = {
        showTrailModal: true,
        trailDetail: {
            id: 1,
            name: 'Trail 1',
            city: 'City',
            state: 'State',
            description: 'A beautiful trail.',
            difficulty: 'Easy',
            stats: {
                type: 'Loop',
                elevationGain: 500,
                elevationLoss: 500,
                distance: 5,
                avgGradePercent: 5,
                avgGradeDegree: 2.9,
            },
            features: ['Waterfall', 'Forest'],
            isComplete: false,
            isWishList: false,
            coordinates: [{ lat: 34.0522, lng: -118.2437 }],
        },
        user: {
            username: 'testuser',
            token: 'mock-token',
        },
    };

    const renderComponent = (appData = defaultAppData) =>
        render(
            <AppContext.Provider value={{ appData, updateAppData: mockUpdateAppData, updateAlertMsg: mockUpdateAlertMsg }}>
                <TrailDetail />
            </AppContext.Provider>
        );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the trail detail modal and displays trail information', () => {
        renderComponent();

        expect(screen.getByText('Trail 1')).toBeInTheDocument();
        expect(screen.getByText('City, State')).toBeInTheDocument();
        expect(screen.getByText('A beautiful trail.')).toBeInTheDocument();
        expect(screen.getByText('Type: Loop')).toBeInTheDocument();
        expect(screen.getByText('Distance: 5 mi.')).toBeInTheDocument();
        expect(screen.getByText('Elevation Gain: 500 ft.')).toBeInTheDocument();
        expect(screen.getByText('Waterfall')).toBeInTheDocument();
        expect(screen.getByText('Map with coordinates')).toBeInTheDocument();
    });

    test('handles closing the modal', () => {
        renderComponent();

        fireEvent.click(screen.getByText('Close'));

        expect(mockUpdateAppData).toHaveBeenCalledWith('showTrailModal', false);
    });

    test('adds trail to wishlist when wishlist icon is clicked', async () => {
        renderComponent();

        fireEvent.click(screen.getByTestId('wishlist-icon'));

        await waitFor(() => {
            expect(TrailsApi.addTrailToWishlist).toHaveBeenCalledWith('testuser', 1, 'mock-token');
        });
    });

    test('removes trail from wishlist when wishlist icon is clicked', async () => {
        const appData = {
            ...defaultAppData,
            trailDetail: {
                ...defaultAppData.trailDetail,
                isWishList: true,
            },
        };
        renderComponent(appData);

        fireEvent.click(screen.getByTestId('wishlist-icon'));

        await waitFor(() => {
            expect(TrailsApi.removeTrailFromWishlist).toHaveBeenCalledWith('testuser', 1, 'mock-token');
        });
    });

    test('marks trail as complete when complete icon is clicked', async () => {
        renderComponent();

        fireEvent.click(screen.getByTestId('complete-icon'));

        await waitFor(() => {
            expect(TrailsApi.addTrailToCompleted).toHaveBeenCalledWith('testuser', 1, 'mock-token');
        });
    });

    test('marks trail as incomplete when complete icon is clicked', async () => {
        const appData = {
            ...defaultAppData,
            trailDetail: {
                ...defaultAppData.trailDetail,
                isComplete: true,
            },
        };
        renderComponent(appData);

        fireEvent.click(screen.getByTestId('complete-icon'));

        await waitFor(() => {
            expect(TrailsApi.removeTrailFromCompleted).toHaveBeenCalledWith('testuser', 1, 'mock-token');
        });
    });
});
