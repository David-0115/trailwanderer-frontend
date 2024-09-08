import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Home from './Home';
import AppContext from './AppContext';
import TrailsApi from './TrailsApi';
import '@testing-library/jest-dom';

jest.mock('./materials/MainCarousel', () => () => <div data-testid="main-carousel" />);
jest.mock('./Search', () => ({ query, updateQuery, showAdvanced, setShowAdvanced }) => {
    return (
        <div>
            <button
                data-testid="show-advanced-search"
                onClick={() => setShowAdvanced(true)}
            >
                Show Advanced
            </button>
            <button
                data-testid="search-component"
                onClick={() => updateQuery('submit', true)}
            >
                Search
            </button>
        </div>
    );
});
jest.mock('./AdvancedSearch', () => ({ open }) => open ? <div data-testid="advanced-search" /> : null);
jest.mock('./SearchResults', () => () => <div data-testid="search-results" />);
jest.mock('./TrailDetail', () => () => <div data-testid="trail-detail" />);
jest.mock('./Loader', () => () => <div data-testid="loader" />);
jest.mock('./TrailsApi', () => ({
    search: jest.fn(),
    loggedInSearch: jest.fn(),
}));

const mockAppData = {
    user: { username: 'testuser', token: 'testtoken' },
    showTrailModal: false,
};

const mockUpdateAlertMsg = jest.fn();

describe('Home Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <AppContext.Provider value={{ appData: mockAppData, updateAlertMsg: mockUpdateAlertMsg }}>
                <Home />
            </AppContext.Provider>
        );

        expect(screen.getByTestId('main-carousel')).toBeInTheDocument();
        expect(screen.getByTestId('search-component')).toBeInTheDocument();
    });

    test('shows advanced search modal when Show Advanced button is clicked', () => {
        render(
            <AppContext.Provider value={{ appData: mockAppData, updateAlertMsg: mockUpdateAlertMsg }}>
                <Home />
            </AppContext.Provider>
        );

        fireEvent.click(screen.getByTestId('show-advanced-search')); // Click to show advanced search modal

        expect(screen.getByTestId('advanced-search')).toBeInTheDocument();
    });


});
