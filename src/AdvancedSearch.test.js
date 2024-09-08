import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdvancedSearch from './AdvancedSearch';
import { formatSearchParams } from './helperFunctions';

// Mock the helper functions
jest.mock('./helperFunctions', () => ({
    formatSearchParams: jest.fn(),
}));

// Mock child components
jest.mock('./materials/MultiSelect', () => ({ options, updateParams, label, objKey }) => (
    <div data-testid={`multiselect-${label.toLowerCase().replace(' ', '-')}`}>
        {label}
    </div>
));

jest.mock('./materials/Slider', () => ({ paramName, updateParams, rangeArr, step, min, max }) => (
    <div data-testid={`slider-${paramName}`}>
        {paramName}
    </div>
));


describe('AdvancedSearch Component', () => {
    const mockUpdateQuery = jest.fn();
    const mockSetOpen = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly with initial props', () => {
        render(
            <AdvancedSearch query={{ term: '' }} updateQuery={mockUpdateQuery} open={true} setOpen={mockSetOpen} />
        );

        expect(screen.getByText('Advanced Search')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
        expect(screen.getByTestId('multiselect-trail-type')).toBeInTheDocument();
        expect(screen.getByTestId('multiselect-difficulty')).toBeInTheDocument();
        expect(screen.getByTestId('multiselect-features')).toBeInTheDocument();
    });

    test('calls updateQuery when typing in the search input', () => {
        render(
            <AdvancedSearch query={{ term: '' }} updateQuery={mockUpdateQuery} open={true} setOpen={mockSetOpen} />
        );

        const searchInput = screen.getByPlaceholderText('Search...');
        fireEvent.change(searchInput, { target: { value: 'mountain' } });

        expect(mockUpdateQuery).toHaveBeenCalledWith('term', 'mountain');
    });

    test('calls setOpen with false on cancel button click', () => {
        const mockSetOpen = jest.fn();
        const mockUpdateQuery = jest.fn();

        const { getByText } = render(
            <AdvancedSearch
                query={{ term: '' }}
                updateQuery={mockUpdateQuery}
                open={true}
                setOpen={mockSetOpen}
            />
        );

        // Simulate the Cancel button click
        fireEvent.click(getByText('Cancel'));

        // Assert that setOpen was called with false
        expect(mockSetOpen).toHaveBeenCalledWith(false);
    });
});
