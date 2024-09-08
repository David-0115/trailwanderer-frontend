import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel, Box, Chip } from '@mui/material';

const MultiSelect = (props) => {
    const { updateParams, options, label, objKey } = props;
    const [selectedValues, setSelectedValues] = useState([])

    const handleChange = (evt) => {
        setSelectedValues(evt.target.value);

    }

    useEffect(() => {

        updateParams(objKey, selectedValues);

    }, [selectedValues])

    return (
        <Box sx={{ width: 150, margin: 'auto', mt: 4 }}>
            <FormControl fullWidth>
                <InputLabel id="multi-select-label">{label}</InputLabel>
                <Select
                    size="small"
                    labelId="multi-select-label"
                    multiple
                    value={selectedValues}
                    onChange={handleChange}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxHeight: 175, overflow: 'auto' }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} size="small" />
                            ))}
                        </Box>
                    )}
                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default MultiSelect;