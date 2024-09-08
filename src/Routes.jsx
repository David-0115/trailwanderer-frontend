import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AppContext from "./AppContext";
import Register from "./Register";
import Home from './Home';
import Login from './Login'
import AuthRedirect from "./AuthRedirect";
import UserProfile from "./UserProfile";
import TrailDetail from "./TrailDetail";
import CompleteOrWishlist from "./CompleteOrWishlist";

const TWRoutes = () => {
    const { user } = useContext(AppContext);
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/oauth" element={<AuthRedirect />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/completed" element={<CompleteOrWishlist dataType="completed" />} />
            <Route path="/wishlist" element={<CompleteOrWishlist dataType="wishlist" />} />
            <Route path="/traildetail/:trailId" element={<TrailDetail />} />
        </Routes>
    )
}

export default TWRoutes;