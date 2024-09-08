import React from "react";
import { styled } from '@mui/material/styles';
import { Box, Button, TextField } from "@mui/material";
import { CloudUploadSharp } from "@mui/icons-material"


const RegistrationForm = (props) => {

    const { formData, handleChange, handleSubmit } = props;

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1
    });

    return (
        <>
            <Box sx={{
                width: '100%',
                textAlign: 'center'
            }}>
                <div><h1>Welcome to Trail Wanderer!</h1>
                    Please complete the form below to register.</div>

            </Box>
            <div>
                <TextField
                    sx={{ m: 1, width: '40ch' }}
                    required
                    size="small"
                    id="outlined-firstName"
                    label="First name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <TextField
                    sx={{ m: 1, width: '40ch' }}
                    required
                    size="small"
                    id="outlined-lastName"
                    label="Last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </div>
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
            <div>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadSharp />}

                >
                    Upload profile image
                    <VisuallyHiddenInput type="file" onChange={handleChange} />
                </Button>
            </div>
            <Button
                sx={{ m: 1 }}
                variant="contained"
                color="success"
                onClick={handleSubmit}
                data-testid="register-button"
            >Register</Button>
        </>

    )
}

export default RegistrationForm;