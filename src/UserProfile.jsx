

import React, { useState, useContext, useEffect } from "react";
import AppContext from "./AppContext";
import TrailsApi from "./TrailsApi";
import Loader from "./Loader";
import { Container } from "@mui/material";
import { isoDateToFormatted } from "./helperFunctions";
import useLocalStorage from "./useLocalStorage";
import UserProfileInfo from "./materials/UserProfileInfo";
import UserTrailStats from "./materials/UserTrailStats";
import EditProfileForm from "./EditProfileForm";

const UserProfile = () => {

    const { appData, updateAlertMsg } = useContext(AppContext);
    const [user, setUser] = useState(null);
    const [trailStats, setTrailStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const { getStorage } = useLocalStorage();

    const updateEditing = () => {
        setEditing(!editing)
    }

    useEffect(() => {
        let currentUser = appData.user;
        if (!currentUser) {
            setLoading(true)
            currentUser = getStorage('user', true)
        }

        if (currentUser) {
            currentUser.createdDate = isoDateToFormatted(currentUser.createdAt)
            setUser(currentUser)
        }

        async function getStats(user) {
            try {
                const resp = await TrailsApi.getUserTrailStats(user.username, user.token)

                if (resp.userStats.totalDistance) {
                    setTrailStats(resp.userStats)
                } else {
                    setTrailStats({
                        trailsCompleted: 0,
                        totalDistance: 0,
                        highestElevation: 0,
                        totalElevtionGain: 0
                    })
                }
            } catch (e) {
                updateAlertMsg("error", e.message)
            }
        }
        if (user && !trailStats) getStats(user)

        setLoading(false)
    }, [appData.user, trailStats, user])

    if (loading || !user || !trailStats) {
        return (
            <Loader />
        )
    } else {
        return (
            <Container
                sx={{
                    mt: 3,
                    height: '80vh',
                    border: 1,
                    borderRadius: '5px',
                    boxShadow: '0 10px 14px rgba(0, 0, 0, 0.17), 0 5px 5px rgba(0, 0, 0, 0.11);',
                    overflowX: 'auto',
                    width: {
                        xs: '100%',
                        sm: '75%',
                        lg: '60%',
                        xl: '50%'
                    }
                }}
            >
                {editing
                    ? <EditProfileForm user={user} setEditing={setEditing} setLoading={setLoading} />
                    : <>
                        <UserProfileInfo user={user} updateEditing={updateEditing} />
                        <UserTrailStats trailStats={trailStats} />
                    </>
                }


            </Container>
        )
    }

}

export default UserProfile

