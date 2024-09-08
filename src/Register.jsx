import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import Loader from "./Loader";
import AppContext from "./AppContext";
import { getBaseUrl } from "./helperFunctions";
import TrailsApi from "./TrailsApi";
import TwButton from "./materials/TwButton";
import GoogleButton from "./materials/GoogleButton";
import FacebookButton from "./materials/FacebookButton";
import RegistrationForm from "./materials/RegistrationForm";
import { Box } from "@mui/material";


const backend = getBaseUrl();

const Register = () => {
    const { updateAlertMsg, updateAppData } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const INITIAL_STATE = {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        profileImagePath: ""
    }

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [profileImgFile, setProfileImgFile] = useState(null);
    const [localUser, setLocalUser] = useState(false);


    const handleChange = evt => {
        const { name, value, files } = evt.target;
        if (files) {
            setProfileImgFile(files[0]);
        }

        setFormData(data => ({
            ...data,
            [name]: value
        }));

    }

    const handleGoogle = () => {
        window.location.href = `${backend}/google`
    }

    const handleFacebook = () => {
        window.location.href = `${backend}/facebook`
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
        setLoading(true);
        formData.username = formData.email.split('@')[0]
        if (profileImgFile) {
            const path = await handleFileUpload();
            formData.profileImagePath = path;
        }

        try {
            const resp = await TrailsApi.register(formData)
            delete formData.password;
            const user = { ...formData, token: resp.token }
            setFormData(INITIAL_STATE);
            updateAppData('user', user);
            setLoading(false);
            updateAlertMsg("success", `Account created for ${user.firstName} ${user.lastName}`)
            navigate('/');
        } catch (e) {
            updateAlertMsg("error", e.message)
        }

    }



    if (loading) {
        return (
            <>
                <Loader />
            </>
        )
    } else {
        return (
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    mt: '5',
                    border: '2px solid grey',
                    borderRadius: '5px',
                    p: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    height: '75vh',
                    boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.1)',
                    width: {
                        xs: '100%',
                        sm: '75%',
                        md: '50%',
                        lg: '40%'
                    }
                }} >

                {localUser
                    ? <RegistrationForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
                    : <><Box sx={{
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        <div>
                            <h1>Welcome to Trail Wanderer!</h1>
                            Please choose your registration type:
                        </div>
                    </Box>
                        <TwButton setLocalUser={setLocalUser} />
                        <GoogleButton handleGoogle={handleGoogle} />
                        <FacebookButton handleFacebook={handleFacebook} />
                    </>
                }

            </Box>

        )

    }

}

export default Register;