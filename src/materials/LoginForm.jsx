import React from "react";
import { Box, Button, TextField } from "@mui/material";



const LoginForm = (props) => {
    const { formData, handleChange, handleSubmit } = props;
    return (
        <>
            <Box sx={{
                width: '100%',
                textAlign: 'center'
            }}>
                <div><h1>Welcome back to Trail Wanderer!</h1>
                    Please sign in below to continue.</div>

            </Box>
            <div>
                <TextField
                    sx={{ m: 1, width: '40ch' }}
                    required
                    size="small"
                    type="email"
                    id="outlined-email"
                    label="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <TextField
                    sx={{ m: 1, width: '40ch' }}
                    required
                    size="small"
                    type="password"
                    id="outlined-password"
                    label="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <Button
                sx={{ m: 1 }}
                variant="contained"
                color="success"
                onClick={handleSubmit}
            >Login</Button>
        </>
    )
}

export default LoginForm