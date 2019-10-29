import React from 'react';
import {Box, Card, CardContent, makeStyles} from '@material-ui/core';
import './Placeholder.scss';
import {beersListItemStyles} from './BeersListItem';

const BeersListItemPlaceholder: React.FC = () => {

    const useStyles = makeStyles(beersListItemStyles);

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Box className={classes.cardActionArea}>
                <CardContent>
                    <Box display="flex"
                         flexDirection={{xs: 'column', md: 'row'}}
                         alignItems="center"
                    >
                        <Box display={{md: 'none'}} className={classes.favouritePlaceholder} />
                        <Box marginRight={2} className={`${classes.cardMedia} placeholder`}/>
                        <Box marginTop={{xs: 3, md: 0}}>
                            <Box m={2} marginX={{xs: 'auto'}} marginLeft={{md: 2}} className="placeholder h5"/>
                            <Box m={2} className="placeholder subtitle2"/>
                        </Box>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    )
};

export default BeersListItemPlaceholder;