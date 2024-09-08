import React from "react";
import SearchBar from "./materials/SearchBar";

const Search = ({ query, updateQuery, showAdvanced, setShowAdvanced }) => {

    const handleChange = (evt) => {
        updateQuery('term', evt.target.value);
    };

    const handleToggle = evt => {
        setShowAdvanced(true);
    }

    const handleTextOnly = evt => {
        if (evt.key === 'Enter' && query.term || query.filter) {
            updateQuery('submit', true)
        }
    }

    return (
        <SearchBar query={query}
            handleChange={handleChange}
            handleToggle={handleToggle}
            handleTextOnly={handleTextOnly}
            showAdvanced={showAdvanced}
        />
    )
}

export default Search;

// searchTerm, page, limit, filters