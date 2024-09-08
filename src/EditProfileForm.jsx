import React, { useState, useContext } from "react";
import AppContext from "./AppContext";
import TrailsApi from "./TrailsApi";
import { styled } from '@mui/material/styles';
import { Box, Button, TextField } from "@mui/material";
import { CloudUploadSharp } from "@mui/icons-material"
import useLocalStorage from "./useLocalStorage";

const EditProfileForm = (props) => {
    const { updateAppData, updateAlertMsg, appData } = useContext(AppContext);
    const { user, setEditing, setLoading } = props;
    const [profileImgFile, setProfileImgFile] = useState(null);
    const { setStorage } = useLocalStorage();


    const INITIAL_STATE = {
        password: "",
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImagePath: user.profileImagePath
    }
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = evt => {
        const { name, value, files } = evt.target;
        if (files) {
            setProfileImgFile(files[0]);
        }
        if (name) {
            setFormData(data => ({
                ...data,
                [name]: value
            }));
        }

    }

    const handleFileUpload = async (file = profileImgFile) => {
        const data = new FormData();
        data.append('file', file);

        try {
            const path = await TrailsApi.uploadImage(data)
            setProfileImgFile(null);

            return path;
        } catch (e) {
            updateAlertMsg("error", e.message)
        }


    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setLoading(true)
        try {
            formData.username = formData.email.split('@')[0] === user.username ? user.username : formData.email.split('@')[0]
            if (formData.password === "") {
                delete formData.password
            }

            if (profileImgFile) {
                const path = await handleFileUpload();
                formData.profileImagePath = path;
            }

            const data = await TrailsApi.updateUsername(user.username, formData, user.token);
            const updatedUser = data.updatedUser;
            setStorage('user', updatedUser, true)
            updateAppData("user", updatedUser);
            updateAlertMsg("success", `${updatedUser.firstName} ${updatedUser.lastName}'s profile was updated.`)
            setLoading(false)
            setEditing(false)
        } catch (e) {
            updateAlertMsg("error", e.message)
        }
    }

    const handleCancel = (evt) => {
        evt.preventDefault();
        setFormData(INITIAL_STATE);
        setEditing(false);
    }

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


        <Box>
            <h3>Editing {`${user.firstName} ${user.lastName}`}'s profile</h3>

            <div>
                <TextField
                    sx={{ m: 2, width: '40ch' }}
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
                    sx={{ m: 2, width: '40ch' }}
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
                    sx={{ m: 2, width: '40ch' }}
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
                    sx={{ m: 2, width: '40ch' }}
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
                    Upload new profile image
                    <VisuallyHiddenInput type="file" onChange={handleChange} />
                </Button>
            </div>
            <Button
                sx={{ m: 2 }}
                variant="contained"
                color="warning"
                onClick={handleSubmit}
            >Submit changes</Button>

            <Button
                sx={{ m: 2 }}
                variant="contained"
                color="success"
                onClick={handleCancel}
            >Cancel</Button>


        </Box>

    )


}

export default EditProfileForm;