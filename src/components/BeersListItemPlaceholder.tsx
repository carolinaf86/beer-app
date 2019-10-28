import React from 'react';
import {Box, Card, CardContent, makeStyles, useTheme} from '@material-ui/core';
import './Placeholder.scss';

function BeersListItemPlaceholder(props: any) {

        const theme = useTheme();
        const useStyles = makeStyles({
            root: {
                marginBottom: theme.spacing(2)
            },
            cardActionArea: {
                '@media (min-width: 960px)': {
                    minHeight: '160px'
                }
            },
            cardMedia: {
                height: '100px',
                width: '100px',
                backgroundSize: 'contain',
                borderRadius: '5px',
                backgroundColor: '#f2f2f2',
                '@media (min-width: 960px)': {
                    marginRight: theme.spacing(2)
                }
            }
        });

        const classes = useStyles();

        return (
                <Card className={classes.root}>
                    <CardContent>
                        <Box display="flex"
                             flexDirection={{xs: 'column', md: 'row'}}
                             alignItems="center"
                             className={classes.cardActionArea}
                        >
                            <Box marginRight={2} className={classes.cardMedia}/>
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