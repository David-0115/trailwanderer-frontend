import React, { useContext } from "react";
import AppContext from "../AppContext";
import { Box, Card, Typography } from "@mui/material";
import Map from './Map';
import WishListIcon from "./WishListIcon";
import TrailCompleteIcon from "./TrailCompleteIcon";

const TrailCard = ({ trail, isUser, wishlistAdd, wishlistRemove, addComplete, removeComplete, }) => {
    const { updateAppData } = useContext(AppContext);

    const handleCardClick = () => {
        updateAppData("trailDetail", trail);
        updateAppData("showTrailModal", true)
    }

    return (
        <Card sx={{
            mt: 3,
            ml: 3,
            width: { xs: 180, sm: 480 },
            bgcolor: '#E98C1A',
            height: { xs: 430, sm: 180 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }
        }}>
            {Array.isArray(trail.coordinates) && trail.coordinates.length > 0
                ? <Map coords={trail.coordinates} width={"180px"} height={"180px"} />
                : <Box
                    component="img"
                    src="/assets/tw-logo200x200.png"
                    alt="Trail Logo"
                    sx={{ width: "180px", height: "180px" }}
                />
            }
            <Box>
                <Box
                    onClick={handleCardClick}
                    sx={{
                        width: { xs: 180, sm: 300 },
                        display: 'flex',
                        flexDirection: 'column',
                        height: { xs: 180, sm: 145 },
                        justifyContent: 'flex-start',
                        p: 2
                    }}>
                    <Typography sx={{ color: '#333333' }}>{trail.name}</Typography>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 1 }}>
                        <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
                            <Typography sx={{ color: '#333333', fontSize: 'small', textAlign: 'left', ml: .5 }}>Loc: {trail.city}, {trail.state}</Typography>
                            <Typography sx={{ color: '#333333', fontSize: 'small', textAlign: 'left', ml: .5 }}>Difficulty: {trail.difficulty}</Typography>
                            <Typography sx={{ color: '#333333', fontSize: 'small', textAlign: 'left', ml: .5 }}>Distance: {trail.stats.distance} mi.</Typography>
                        </Box>
                        <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
                            <Typography sx={{ color: '#333333', fontSize: 'small', textAlign: { xs: 'left', sm: 'right' }, ml: { xs: .5 }, mr: .5 }}>Type: {trail.stats.type}</Typography>
                            <Typography sx={{ color: '#333333', fontSize: 'small', textAlign: { xs: 'left', sm: 'right' }, ml: { xs: .5 }, mr: .5 }}>Dogs: {trail.dogsAllowed}</Typography>
                            <Typography sx={{ color: '#333333', fontSize: 'small', textAlign: { xs: 'left', sm: 'right' }, ml: { xs: .5 }, mr: .5 }}>Elevation Gain: {trail.stats.elevationGain} ft.</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ height: { xs: 50, sm: 25 }, width: '100%' }}>
                    {isUser ?
                        <Box sx={{
                            width: '100%',
                            mt: 'auto',
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-evenly',
                        }}>
                            <TrailCompleteIcon completed={trail.isComplete} trailId={trail.id} addComplete={addComplete} removeComplete={removeComplete} />
                            <WishListIcon onList={trail.isWishList} trailId={trail.id} wishlistAdd={wishlistAdd} wishlistRemove={wishlistRemove} />
                        </Box>
                        : null
                    }
                </Box>
            </Box>
        </Card>
    )
}

export default TrailCard;
