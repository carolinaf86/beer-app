import React from 'react'
import {AppBar, Box, Toolbar, Typography} from '@material-ui/core';
import {Favorite, HomeRounded} from '@material-ui/icons';
import {NavLink} from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <NavLink to={"/"} aria-label="home" className="app-bar-link m-r-sm">
                        <HomeRounded/>
                    </NavLink>
                    <Box flexGrow={1}>
                        <Typography variant={"h6"} color="inherit">
                            Beer App
                        </Typography>
                    </Box>
                    <NavLink to={"/favourites"} aria-label="favourites" className="app-bar-link">
                        <Favorite/>
                    </NavLink>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default NavBar;