import React, { useContext } from "react";
import AppContext from "./AppContext";
import { Alert, Box, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


/** 
 *  msg = {
 *    type: "success"  || "error" || "info" || "warning",
 *    text: "message text"
 *   }
*/

const UserAlert = () => {
    const { alertMsg, deleteAlertMsg } = useContext(AppContext);

    if (!alertMsg) {
        return null;
    }

    const alertColor = alertMsg.type === 'success' ? '#388E3C' : alertMsg.type === 'error' ? '#D32F2F' : alertMsg.type === 'info' ? '#0288D1' : '#F57C00';
    const textColor = alertMsg.type === 'success' || alertMsg.type === 'error' ? '#FFFFFF' : '#333333';

    return (
        <Box sx={{ width: '75%', position: 'absolute', top: '65px', zIndex: 99 }}>
            <Alert
                variant="filled"
                severity={alertMsg.type}
                sx={{ color: textColor, backgroundColor: alertColor }}
                action={
                    <IconButton
                        size="small"
                        onClick={deleteAlertMsg}
                        sx={{ color: textColor }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {alertMsg.text}
            </Alert>
        </Box>
    );
};

export default UserAlert;
