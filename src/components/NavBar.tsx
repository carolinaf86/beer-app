import React from 'react'
import {AppBar, Box, makeStyles, Toolbar, Tooltip, Typography, useTheme} from '@material-ui/core';
import {Favorite, HomeRounded} from '@material-ui/icons';
import {NavLink} from 'react-router-dom';

function NavBar() {

    const theme = useTheme();
    const useStyles = makeStyles({
        navLink: {
            color: '#FFFFFF',
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2)
        }
    });
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Tooltip title="Home" aria-label="Home">
                        <NavLink to={"/"} aria-label="Home" className={classes.navLink}>
                            <HomeRounded/>
                        </NavLink>
                    </Tooltip>
                    <Box flexGrow={1}>
                        <Typography variant={"h6"} color="inherit">
                            Beer App
                        </Typography>
                    </Box>
                    <Tooltip title="Favourites" aria-label="Favourites">
                        <NavLink to={"/favourites"} aria-label="Favourites" className={classes.navLink}>
                            <Favorite/>
                        </NavLink>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default NavBar;