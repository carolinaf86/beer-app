import React from 'react'
import {AppBar, Box, Toolbar, Tooltip, Typography} from '@material-ui/core';
import {Favorite, HomeRounded} from '@material-ui/icons';
import {NavLink} from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Tooltip title="Home" aria-label="Home">
                        <Box marginX={2}>
                            <NavLink to={"/"} aria-label="Home" className="app-bar-link">
                                <HomeRounded/>
                            </NavLink>
                        </Box>
                    </Tooltip>
                    <Box flexGrow={1}>
                        <Typography variant={"h6"} color="inherit">
                            Beer App
                        </Typography>
                    </Box>
                    <Box marginX={2}>
                        <Tooltip title="Favourites" aria-label="Favourites">
                            <NavLink to={"/favourites"} aria-label="Favourites" className="app-bar-link">
                                <Favorite/>
                            </NavLink>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default NavBar;