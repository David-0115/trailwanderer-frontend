import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import useLocalStorage from './useLocalStorage'
import AppContext from './AppContext';
import { Box, AppBar, Toolbar, IconButton, MenuItem, Menu, Container, Avatar, Button, Tooltip, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';




const settings = ['Profile', 'Completed', 'Wishlist', 'Logout'];

const Navbar = () => {
    const { appData, updateAppData, updateAlertMsg } = useContext(AppContext);
    const pages = appData.user ? [] : ['Register', 'Login'];
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { removeStorage } = useLocalStorage();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavItem = (evt) => {
        handleCloseNavMenu();
        const text = (evt.target.innerText);

        if (text === "REGISTER") navigate('/register');
        if (text === "LOGIN") navigate('/login');
    };

    const handleLogout = () => {
        removeStorage('user');
        updateAlertMsg('info', `${appData.user.firstName} has been logged out. `)
        updateAppData('user', null);
        navigate('/');
    }

    const handleUserItem = (evt) => {

        handleCloseUserMenu();
        const text = (evt.currentTarget.textContent);

        if (text === "Logout") handleLogout();
        if (text === "Profile") navigate(`/profile`);
        if (text === "Completed") navigate('/completed');
        if (text === "Wishlist") navigate('/wishlist');
    }

    return (
        <AppBar position="absolute" sx={{ height: '64px' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ minHeight: '64px' }}>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        <Tooltip title="Home" placement='right'>
                            <a href="/"><img src="/assets/TW-logo-grn.png" alt="Trail Wanderer logo" style={{ height: '60px', width: 'auto' }} /></a>
                        </Tooltip>
                    </Box>

                    {/* <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleNavItem}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> */}

                    <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, alignItems: 'center' }}>
                        <Tooltip title="Home" placement='right'>
                            <a href="/"><img src="/assets/TW-logo-grn.png" alt="Trail Wanderer logo" style={{ height: '60px', width: 'auto' }} /></a>
                        </Tooltip>
                    </Box>

                    <Box sx={{ display: 'flex', flexGrow: 0, justifyContent: 'flex-end', alignItems: 'center', width: 'auto' }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleNavItem} // Update this line
                                    sx={{ my: 1, color: 'white', display: 'block' }}

                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {appData.user ? (
                                <>
                                    <Tooltip title="Open my links" placement='left'>
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Profile Image" src={appData.user.profileImagePath} data="testid-avatar" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting, idx) => (
                                            <MenuItem key={setting} onClick={handleUserItem}>
                                                <Typography textAlign="center" data={`testid${idx}`}>{setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                            ) : null}
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;

