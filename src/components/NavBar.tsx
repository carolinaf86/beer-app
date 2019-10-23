import React from 'react'
import {AppBar, Box, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Favorite, HomeRounded} from '@material-ui/icons';

const NavBar = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="home">
                        <HomeRounded/>
                    </IconButton>
                    <Box flexGrow={1}>
                        <Typography variant={"h6"} color="inherit">
                            Beer App
                        </Typography>
                    </Box>

                    <IconButton edge="end" color="inherit" aria-label="favourites">
                        <Favorite/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default NavBar;