import React from "react";
import { Box, Typography } from '@mui/material'

const UserTrailStats = (props) => {
    const { trailStats } = props;

    return (
        <Box sx={{ height: '45%' }}>
            <h3>My trail stats:</h3>
            <Box sx={{ display: "flex" }}>
                <Box sx={{ width: '150px' }}>
                    <img src="/src/assets/profile_stats.png" width={'144px'} />
                </Box>
                <Box width={'80%'} ml={{ xs: 2, sm: 6, md: 10, lg: 15 }}>
                    <Typography sx={{ width: '100%', textAlign: "left" }}>Completed trails: {`${trailStats.trailsCompleted}`}</Typography>
                    <Typography sx={{ width: '100%', textAlign: "left" }}>Total distance traveled: {`${trailStats.totalDistance} mi.`}</Typography>
                    <Typography sx={{ width: '100%', textAlign: "left" }}>Total elevation climbed: {`${trailStats.totalElevationGain} ft.`}</Typography>
                    <Typography sx={{ width: '100%', textAlign: "left" }}>Highest elevation reached: {`${trailStats.highestElevation} ft.`}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default UserTrailStats