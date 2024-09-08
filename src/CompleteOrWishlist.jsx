import React, { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext";
import TrailsApi from "./TrailsApi";
import TrailDetail from "./TrailDetail";
import Loader from "./Loader";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import TrailCard from "./materials/TrailCard";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const CompleteOrWishlist = ({ dataType }) => {
    const { appData, updateAlertMsg } = useContext(AppContext);
    const [trails, setTrails] = useState(null);
    const [user, setUser] = useState(appData.user)


    useEffect(() => {
        setUser(appData.user);

        async function getTrails() {

            try {
                const res = dataType === "completed"
                    ? await TrailsApi.getCompletedTrails(user.username, user.token)
                    : await TrailsApi.getWishlist(user.username, user.token)


                dataType === "completed" && res
                    ? setTrails(res.completedList)
                    : setTrails(res.wishlist)


            } catch (e) {
                if (e.message === `Error retrieving completed trails for user ${user.id}: No trails found for the provided IDs`
                    || e.message === `Unable to retrive wishlist for user ${user.id}: No trails found for the provided IDs`
                ) {
                    setTrails([])

                } else {
                    updateAlertMsg("error", e.message)
                }
            }


        }

        getTrails();

    }, [dataType]);

    const wishlistAdd = async (trailId) => {
        try {
            const res = await TrailsApi.addTrailToWishlist(user.username, trailId, user.token)

        } catch (e) {
            updateAlertMsg("error", e.message)
        }
    }

    const wishlistRemove = async (trailId) => {
        try {
            const res = await TrailsApi.removeTrailFromWishlist(user.username, trailId, user.token)

        } catch (e) {
            updateAlertMsg("error", e.message)
        }
    }

    const addComplete = async (trailId) => {
        try {
            const res = await TrailsApi.addTrailToCompleted(user.username, trailId, user.token)

        } catch (e) {
            updateAlertMsg("error", e.message)
        }
    }

    const removeComplete = async (trailId) => {
        try {
            const res = await TrailsApi.removeTrailFromCompleted(user.username, trailId, user.token)

        } catch (e) {
            updateAlertMsg("error", e.message)
        }
    }

    if (trails) {
        return (
            <>
                {appData.showTrailModal && <TrailDetail />}
                <Box
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'rgba(51, 51, 51, 0.75)',
                        mt: 2,
                        pb: 2,
                        borderRadius: '7px',
                    }}>
                    <Typography variant="h5" sx={{ color: 'white', mt: 2 }}>{dataType === "completed" ? `${user.firstName}'s Completed Trails:` : `${user.firstName}'s Trail Wishlist:`} {trails.length === 0 ? `No ${dataType} trails for ${user.firstName}` : null}</Typography>
                    <Grid
                        container
                        spacing={2}
                        justifyContent={{
                            xs: 'center',
                            md: 'space-between'
                        }}

                    >
                        {trails.length > 0 && trails.map((trail) => (
                            <Grid item xs={12} md={5.8} key={trail.id}>
                                <TrailCard trail={trail} isUser={true} wishlistAdd={wishlistAdd} wishlistRemove={wishlistRemove} addComplete={addComplete} removeComplete={removeComplete} />
                            </Grid>
                        ))}


                    </Grid>
                    <Box sx={{
                        mt: 2,
                        width: '95%',
                        display: 'flex',
                        justifyContent: 'flex-end',

                    }}>

                        {/* TODO: Implement pagination for results  */}
                        {/* <Box
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
                        </Box> */}
                        {/* </Box> */}

                    </Box>
                </Box>
            </>
        )
    } else {
        return (
            <Loader />
        )
    }


}

export default CompleteOrWishlist;


