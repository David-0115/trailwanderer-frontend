import { Box, Modal, Button, Typography, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import MultiSelect from "./materials/MultiSelect";
import SearchIcon from '@mui/icons-material/Search';
import CustomSlider from "./materials/Slider";
import { formatSearchParams } from "./helperFunctions";


const difficultyOptions = ["Easy", "Intermediate", "Moderate", "Difficult", "Hard", "Very Hard"]
const featureOptions = ["Birding", "Cave", "Commonly Backpacked", "Fall Colors", "Fishing", "Geological Significance", "Historical Significance", "Hot Spring", "Lake", "River/Creek", "Spring", "Swimming", "Views", "Waterfall", "Wildflowers", "Wildlife"]
const typeOptions = ["Point to Point", "Loop", "Lollipop", "Out and Back"]

const AdvancedSearch = ({ query, updateQuery, open, setOpen }) => {

    const [params, setParams] = useState({});


    const handleClose = () => setOpen(false);

    const handleTextOnly = evt => {
        if (evt.key === 'Enter') {
            sendSearch(query)
        }
    }

    const handleChange = (evt) => {
        updateQuery('term', evt.target.value)
    };

    const updateParams = (key, value) => {
        setParams(prevParams => ({
            ...prevParams,
            [key]: value
        }));
    }

    const handleSearch = (evt) => {
        evt.preventDefault();
        const filters = formatSearchParams(params)
        updateQuery('filters', filters)
        updateQuery('submit', true)
        setOpen(false);
    }

    return (

        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>


                <Box sx={{
                    width: { xs: '100%', sm: '90%', md: '75%', lg: '50%' },
                    height: 450,
                    display: 'flex',
                    bgcolor: '#F5F5DC',
                    borderRadius: '7px',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <Typography sx={{ mt: 1 }}>Advanced Search</Typography>

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
                        sx={{ minWidth: { xs: 320, sm: 600 }, maxWidth: 600, mt: 1 }}
                    />

                    <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
                        <Box sx={{ mt: 1, mr: 1, width: { xs: 100, sm: 150 } }}>
                            <Typography id="distance" gutterBottom textAlign={"center"}>Distance</Typography>
                            <CustomSlider paramName="distance" updateParams={updateParams} rangeArr={[0, 50]} step={1} min={0} max={100} />
                        </Box>
                        <Box sx={{ mt: 1, mr: 1, width: { xs: 100, sm: 150 } }}>
                            <Typography id="elevationGain" gutterBottom textAlign={"center"}>Elevation Gain</Typography>
                            <CustomSlider paramName="elevationGain" updateParams={updateParams} rangeArr={[0, 2500]} step={250} min={0} max={5000} />
                        </Box>
                        <Box sx={{ mt: 1, mr: 1, width: { xs: 100, sm: 150 } }}>
                            <Typography id="elevationLoss" gutterBottom textAlign={"center"}>Elevation Loss</Typography>
                            <CustomSlider paramName="elevationLoss" updateParams={updateParams} rangeArr={[0, 2500]} step={250} min={0} max={5000} />
                        </Box>
                        <Box sx={{ mt: 1, width: { xs: 100, sm: 150 } }}>
                            <Typography id="maxElevation" gutterBottom textAlign={"center"}>Maximum Elevation</Typography>
                            <CustomSlider paramName="maxElevation" updateParams={updateParams} rangeArr={[0, 7500]} step={500} min={0} max={15000} />
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
                        <MultiSelect options={typeOptions} updateParams={updateParams} label="Trail Type" objKey="type" />
                        <MultiSelect options={difficultyOptions} updateParams={updateParams} label="Difficulty" objKey="difficulty" />
                        <MultiSelect options={featureOptions} updateParams={updateParams} label="Features" objKey="features" />
                    </Box>
                    <Box sx={{ mt: 50, width: '100%', display: 'flex', justifyContent: 'space-evenly', position: 'absolute' }}>
                        <Button onClick={handleSearch} color="primary" variant="contained">Search</Button>
                        <Button onClick={handleClose} color="success" variant="contained">Cancel</Button>
                    </Box>



                </Box>
            </Box>
        </Modal>
    )
}

export default AdvancedSearch;


/**
 * filter params:
 * type
 * minDistance
 * maxDistance
 * minElevation
 * maxElevation
 * minElevationGain
 * maxElevationGain
 * minElevationLoss
 * maxElevationLoss
 * const difficultyOptions = ["Easy", "Intermediate", "Moderate", "Difficult", "Hard", "Very Hard"]
 * const featureOptions = ["Birding", "Cave", "Commonly Backpacked", "Fall Colors", "Fishing", "Geological Significance", "Historical Significance", "Hot Spring", "Lake", "River/Creek", "Spring", "Swimming", "Views", "Waterfall", "Wildflowers", "Wildlife"]
 * const typeOptions = ["Point to Point", "Loop", "Lollipop", "Out and Back"]
 */

