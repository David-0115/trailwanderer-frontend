import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import Loader from "./Loader";
import AppContext from "./AppContext";
import TrailsApi from "./TrailsApi";
import { Box } from "@mui/material";
import TwButton from "./materials/TwButton";
import GoogleButton from "./materials/GoogleButton";
import FacebookButton from "./materials/FacebookButton";
import LoginForm from "./materials/LoginForm";
import { getAuthUrl } from "./helperFunctions"


const backend = getAuthUrl()

const Login = () => {
    const { updateAlertMsg, updateAppData } = useContext(AppContext);
    const [localUser, setLocalUser] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const INITIAL_STATE = {
        email: "",
        password: ""
    }
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = evt => {
        const { name, value } = evt.target;
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

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setLoading(true)
        const data = {
            username: formData.email.split('@')[0],
            password: formData.password
        }

        try {
            const resp = await TrailsApi.login(data);
            const resp1 = await TrailsApi.getUsername(data.username, resp.token);
            const user = { ...resp1.user, token: resp.token };
            updateAppData('user', user);
            setFormData(INITIAL_STATE);
            updateAlertMsg("success", `Welcome back, ${user.firstName}!`);
            setLoading(false);
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
                    mt: 5,
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
                    ? <LoginForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
                    : <><Box sx={{
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        <div>
                            <h1>Welcome back!</h1>
                            Please choose your login type:
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

export default Login;