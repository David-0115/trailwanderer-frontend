import React from "react";
import { Box, Button, Typography, Avatar } from "@mui/material";

const UserProfileInfo = (props) => {
    const { user, updateEditing } = props;
    return (
        <Box sx={{ height: '45%' }}>
            <h3>{`${user.firstName}'s Profile:`}</h3>
            <Box sx={{ display: "flex" }} >
                <Box sx={{ width: '80px' }}>
                    <Avatar
                        src={user.profileImagePath}
                        alt={`${user.firstName} ${user.lastName}`}
                        sx={{ width: 72, height: 72 }}
                    />
                </Box>
                <Box sx={{
                    ml: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    width: '40%'
                }}>
                    <Typography sx={{ width: '100%', textAlign: "left" }}>Name: {`${user.firstName} ${user.lastName}`}</Typography>
                    <Typography sx={{ width: '100%', textAlign: "left" }}>Email: {`${user.email}`}</Typography>
                    <Typography sx={{ width: '100%', textAlign: "left" }}>Username: {`${user.username}`}</Typography>
                </Box>
                <Box sx={{
                    ml: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "flex-start",
                    width: '40%'
                }}>
                    <Typography sx={{ width: '100%', textAlign: "left" }}>Joined: {`${user.createdDate}`}</Typography>
                    <Typography sx={{ width: '100%', textAlign: "left" }}>Active: {`${user.active}`}</Typography>
                </Box>

            </Box>
            {user.acctType === "local"
                ? <Box>
                    <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        sx={{ mt: 2 }}
                        onClick={updateEditing}
                    >Edit Profile / Change Password</Button>


                </Box>
                : null
            }
        </Box>
    )
}

export default UserProfileInfo;