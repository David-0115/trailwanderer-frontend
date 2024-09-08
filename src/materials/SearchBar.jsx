import React from "react";
import { TextField, Box, InputAdornment, FormGroup, Switch, FormControlLabel } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = (props) => {
    const { query, handleChange, handleToggle, handleTextOnly, showAdvanced } = props;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, maxWidth: 600 }}>
                <TextField
                    size="small"
                    variant="outlined"
                    placeholder="Search..."
                    value={query.term}
                    onChange={handleChange}
                    onKeyDown={handleTextOnly}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ minWidth: { xs: 320, sm: 600, mt: 3 }, maxWidth: 600 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch
                                    size="small"
                                    checked={showAdvanced}
                                    onChange={handleToggle}
                                />}
                                label="Advanced Search" />
                        </FormGroup>
                    </Box>
                </Box>
            </Box>
        </Box>
    )

}

export default SearchBar;