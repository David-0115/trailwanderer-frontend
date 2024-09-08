import React, { useState, useContext, useEffect } from "react";
import AppContext from "./AppContext";
import TrailsApi from "./TrailsApi";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import TrailCard from "./materials/TrailCard";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const SearchResults = ({ data, page, updateQuery }) => {
    const { totalCount, trails } = data.result
    const { appData, updateAlertMsg } = useContext(AppContext);
    const [isUser, setIsUser] = useState(null)
    const [currentResults, setCurrentResults] = useState({
        start: totalCount > 0 ? 1 : 0,
        end: totalCount > 0 ? Math.min(trails.length * page, totalCount) : 0
    });

    const handleNext = () => {
        const newPage = page + 1;
        setCurrentResults({
            start: (newPage - 1) * 10 + 1,
            end: Math.min(newPage * 10, totalCount)
        });
        updateQuery('page', newPage);
        updateQuery('submit', true);
    };

    const handlePrevious = () => {
        const newPage = page - 1;
        setCurrentResults({
            start: (newPage - 1) * 10 + 1,
            end: Math.min(newPage * 10, totalCount)
        });
        updateQuery('page', newPage);
        updateQuery('submit', true);
    };

    const wishlistAdd = async (trailId) => {
        try {
            const res = await TrailsApi.addTrailToWishlist(appData.user.username, trailId, appData.user.token)

        } catch (e) {
            updateAlertMsg("error", e.message)
        }
    }

    const wishlistRemove = async (trailId) => {
        try {
            const res = await TrailsApi.removeTrailFromWishlist(appData.user.username, trailId, appData.user.token)

        } catch (e) {
            updateAlertMsg("error", e.message)
        }
    }

    const addComplete = async (trailId) => {
        try {
            const res = await TrailsApi.addTrailToCompleted(appData.user.username, trailId, appData.user.token)

        } catch (e) {
            updateAlertMsg("error", e.message)
        }
    }

    const removeComplete = async (trailId) => {
        try {
            const res = await TrailsApi.removeTrailFromCompleted(appData.user.username, trailId, appData.user.token)

        } catch (e) {
            updateAlertMsg("error", e.message)
        }
    }

    useEffect(() => {
        setCurrentResults({
            start: page > 0 ? (page - 1) * 10 + 1 : 0,
            end: Math.min(page * 10, totalCount)
        });
    }, [page, trails.length, totalCount]);

    useEffect(() => {
        if (appData.user && appData.user.username) {
            setIsUser(true)
        } else {
            setIsUser(false)
        }
    }, [appData.user])


    return (

        <Box
            sx={{
                flexGrow: 1,
                bgcolor: 'rgba(51, 51, 51, 0.75)',
                mt: 2,
                pb: 2,
                borderRadius: '7px',
            }}>
            <Typography sx={{ color: 'white' }}>Search Results:</Typography>
            <Grid
                container
                spacing={2}
                justifyContent={{
                    xs: 'center',
                    md: 'space-between'
                }}

            >
                {totalCount > 0 && trails.map((trail) => (
                    <Grid item xs={12} md={5.8} key={trail.id}>
                        <TrailCard trail={trail} isUser={isUser} wishlistAdd={wishlistAdd} wishlistRemove={wishlistRemove} addComplete={addComplete} removeComplete={removeComplete} />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{
                mt: 2,
                width: '95%',
                display: 'flex',
                justifyContent: 'flex-end',

            }}>
                <Box
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <Typography sx={{ color: 'white' }}>Showing: {currentResults.start} - {currentResults.end} of {totalCount}</Typography>
                    <Box sx={{ ml: 2, width: 80, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                        <IconButton
                            sx={{ '&:hover': { bgcolor: '#E98C1A' } }}
                            onClick={handlePrevious}
                            disabled={currentResults.start === 1 || totalCount < 1}
                        ><KeyboardArrowLeftIcon
                                sx={{ color: "white", '&:hover': { color: '#333333' } }} /></IconButton>
                        <IconButton
                            onClick={handleNext}
                            sx={{ '&:hover': { bgcolor: '#E98C1A' } }}
                            disabled={totalCount < 1 || currentResults.end >= totalCount}
                        ><KeyboardArrowRightIcon
                                sx={{ color: "white", '&:hover': { color: '#333333' } }} /></IconButton>
                    </Box>
                </Box>

            </Box>
        </Box>


    )
}

export default SearchResults;