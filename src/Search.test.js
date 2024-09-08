import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';
import '@testing-library/jest-dom';

describe('Search Component', () => {
    const mockUpdateQuery = jest.fn();
    const mockSetShowAdvanced = jest.fn();

    const defaultProps = {
        query: { term: '', filter: '' },
        updateQuery: mockUpdateQuery,
        showAdvanced: false,
        setShowAdvanced: mockSetShowAdvanced,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the search input field', () => {
        render(<Search {...defaultProps} />);

        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    test('handles text input change', () => {
        render(<Search {...defaultProps} />);

        const searchInput = screen.getByPlaceholderText('Search...');
        fireEvent.change(searchInput, { target: { value: 'hiking' } });

        expect(mockUpdateQuery).toHaveBeenCalledWith('term', 'hiking');
    });

    test('handles advanced search toggle', () => {
        render(<Search {...defaultProps} />);

        const toggleSwitch = screen.getByLabelText('Advanced Search');
        fireEvent.click(toggleSwitch);

        expect(mockSetShowAdvanced).toHaveBeenCalledWith(true);
    });

    test('submits search when Enter key is pressed with term', () => {
        render(<Search {...defaultProps} query={{ term: 'hiking', filter: '' }} />);

        const searchInput = screen.getByPlaceholderText('Search...');
        fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });

        expect(mockUpdateQuery).toHaveBeenCalledWith('submit', true);
    });

    test('submits search when Enter key is pressed with filter', () => {
        render(<Search {...defaultProps} query={{ term: '', filter: 'advanced' }} />);

        const searchInput = screen.getByPlaceholderText('Search...');
        fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });

        expect(mockUpdateQuery).toHaveBeenCalledWith('submit', true);
    });

    test('does not submit search when Enter key is pressed with empty term and filter', () => {
        render(<Search {...defaultProps} query={{ term: '', filter: '' }} />);

        const searchInput = screen.getByPlaceholderText('Search...');
        fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });

        expect(mockUpdateQuery).not.toHaveBeenCalledWith('submit', true);
    });
});
