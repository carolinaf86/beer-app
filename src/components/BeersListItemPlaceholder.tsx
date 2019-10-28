import React from 'react';
import {Box, Card, CardContent, makeStyles} from '@material-ui/core';
import './Placeholder.scss';
import {beersListItemStyles} from './BeersListItem';

function BeersListItemPlaceholder() {

        const useStyles = makeStyles(beersListItemStyles);

        const classes = useStyles();

        return (
                <Card className={classes.root}>
                    <CardContent>
                        <Box display="flex"
                             flexDirection={{xs: 'column', md: 'row'}}
                             alignItems="center"
                             className={classes.cardActionArea}
                        >
                            <Box marginRight={2} className={`${classes.cardMedia} placeholder`}/>
                            <Box textAlign={{xs: 'center', md: 'left'}} marginTop={{xs: 3, md: 0}}>
                                <Box m={2} className="placeholder h5"/>
                                <Box m={2} className="placeholder subtitle2"/>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
        )
};

export default BeersListItemPlaceholder;