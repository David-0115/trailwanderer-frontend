import React from "react";
import { Box, Button } from "@mui/material";

const TwButton = (props) => {
    const { setLocalUser } = props;

    return (
        <Button
            variant="contained"
            sx={{
                m: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '70%'
            }}
            onClick={() => setLocalUser(true)}
        >
            <Box
                component="img"
                src="/assets/TW-logo-grn.png"
                alt="Trail Wanderer Logo"
                sx={{ height: '40px', borderRadius: '7px' }}
            />
            <small>Continue with Trail Wanderer</small>
        </Button>
    )

}

export default TwButton;