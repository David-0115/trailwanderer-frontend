import React, { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import { Box, Modal, Button, Typography, InputAdornment, TextField } from "@mui/material";
import TrailsApi from "./TrailsApi";
import WishListIcon from "./materials/WishListIcon";
import TrailCompleteIcon from "./materials/TrailCompleteIcon";
import Map from './materials/Map';

const TrailDetail = () => {
    const { appData, updateAppData, updateAlertMsg } = useContext(AppContext);
    const [open, setOpen] = useState(false);

    const trail = appData.trailDetail;

    const handleClose = () => {
        updateAppData("showTrailModal", false);
        setOpen(false);
    }
    useEffect(() => {
        if (appData.showTrailModal) {
            setOpen(true)
        }
    }, [appData.showTrailModal])

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


    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{ p: 0 }}
        >
            <Box sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 0
            }}>


                <Box sx={{

                    width: { xs: '100%', sm: '90%', md: '75%', xl: 1160 },
                    height: 600,
                    display: 'flex',
                    bgcolor: '#F5F5DC',
                    borderRadius: '7px',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>

                    <Box sx={{
                        mt: 2,


                        width: '100%',
                        display: 'flex'
                    }}>
                        <Box
                            sx={{
                                position: 'relative',
                                width: '300px',
                                height: '300px',
                                overflow: 'hidden',
                                borderRadius: 5,
                                ml: 3
                            }}
                        >
                            <Box
                                component="img"
                                src={"assets/tw-img-placeholder.png"}
                                alt="Trail image"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                            <Typography
                                fontSize={12}
                                sx={{
                                    position: 'absolute',
                                    bottom: '0%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: 'white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                }}
                            >
                                Image Placeholder
                            </Typography>
                        </Box>
                        <Box sx={{
                            ml: { xs: 1, sm: 2, md: 3 },
                            mr: { xs: 1, sm: 2, md: 3 },
                            width: '80%',
                            height: '300px',
                            borderRadius: 5,
                            border: '1px solid black',
                            position: 'relative'

                        }}>
                            {appData.user && <Box sx={{ position: 'absolute', zIndex: 999, width: '100%', display: 'flex', justifyContent: 'space-between' }} >
                                <TrailCompleteIcon completed={trail.isComplete} trailId={trail.id} addComplete={addComplete} removeComplete={removeComplete} />
                                <WishListIcon onList={trail.isWishList} trailId={trail.id} wishlistAdd={wishlistAdd} wishlistRemove={wishlistRemove} />
                            </Box>}

                            {Array.isArray(trail.coordinates) && trail.coordinates.length > 0
                                ? <Box sx={{ width: '100%', borderRadius: 5, overflow: 'hidden' }}>
                                    <Map coords={trail.coordinates} width={"815px"} height={"298px"} />
                                </Box>
                                :
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        minWidth: '236px',
                                        height: '300px',
                                        overflow: 'hidden',
                                        borderRadius: 5,

                                    }}
                                >
                                    <Box
                                        component="img"
                                        src="/assets/map-placeholder.png"
                                        alt="Trail Map"
                                        sx={{
                                            width: '100%',
                                            minWidth: '236px',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: 5
                                        }}

                                    />
                                    <Typography
                                        fontSize={12}
                                        sx={{
                                            position: 'absolute',
                                            bottom: '0%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            color: 'white',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        Map Placeholder - Map not available.
                                    </Typography>
                                </Box>
                            }
                        </Box>
                    </Box>

                    <Box sx={{
                        mt: 2,
                        width: "80%",
                        display: 'flex',
                        justifyContent: 'space between',
                        flexDirection: 'row',
                        alignItems: 'baseline'
                    }}>
                        <Typography
                            variant="h4"
                            sx={{ ml: 3, width: '50%' }}
                        >{trail.name}</Typography>
                        <Typography sx={{ mr: 3, width: '50%', display: 'flex', justifyContent: 'flex-end' }}>{trail.city}, {trail.state}</Typography>
                    </Box>
                    <hr width="80%"></hr>
                    <Box sx={{ width: '80%', overflow: 'auto' }}>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                            <Box sx={{ width: '75%', display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ width: "100%", display: 'flex', flexDirection: 'row' }}>
                                        <Box width="33%">
                                            <Typography sx={{ textAlign: 'center' }}>Type: {trail.stats.type}</Typography>
                                            <Typography sx={{ textAlign: 'center' }}>Elevation Gain: {trail.stats.elevationGain} ft.</Typography>
                                        </Box>
                                        <Box width="33%">
                                            <Typography sx={{ textAlign: 'center' }}>Difficulty: {trail.difficulty}</Typography>
                                            <Typography sx={{ textAlign: 'center' }}>Elevation Loss: {trail.stats.elevationLoss} ft.</Typography>
                                        </Box>
                                        <Box width="33%">
                                            <Typography sx={{ textAlign: 'center' }}>Distance: {trail.stats.distance} mi.</Typography>
                                            <Typography sx={{ textAlign: 'center' }}>Average Grade: {trail.stats.avgGradePercent}% / {trail.stats.avgGradeDegree}°</Typography>

                                        </Box>

                                    </Box>
                                    <Box sx={{ width: "100%", mt: 2 }}><Typography>Description:</Typography>
                                        <Typography>{trail.description}</Typography></Box>
                                </Box>
                            </Box>
                            <Box sx={{ width: '25%' }}>
                                <Box width="100%">
                                    <Typography sx={{ textAlign: 'center' }}>Trail Features:</Typography>
                                    {trail.features.map((feature) => (<Typography sx={{ textAlign: 'center' }}>{feature}</Typography>))}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            size="small"
                            color="error"
                            sx={{ mb: 2, mr: 3 }}
                            onClick={handleClose}
                        >Close</Button>
                    </Box>
                </Box>

            </Box>

        </Modal>
    )
}

export default TrailDetail