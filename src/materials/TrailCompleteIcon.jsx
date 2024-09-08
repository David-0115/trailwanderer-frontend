import React, { useState } from "react";
import { Box, Chip } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';



const TrailCompleteIcon = ({ completed, trailId, addComplete, removeComplete }) => {

    const [isComplete, setIsComplete] = useState(completed);

    const handleClick = () => {
        isComplete ? removeComplete(trailId) : addComplete(trailId)
        setIsComplete(!isComplete)
    }

    return (
        <Box sx={{ m: .5 }}>
            {isComplete
                ? <Chip
                    size="small"
                    label="Completed"
                    variant="filled"
                    onClick={handleClick}
                    icon={<CheckCircleOutlineIcon />}
                    color="primary"
                />
                : <Chip
                    size="small"
                    label="Not Completed"
                    variant="filled"
                    onClick={handleClick}
                    icon={<HighlightOffIcon />}
                    color="error"
                />

            }
        </Box>

    )
}

export default TrailCompleteIcon;