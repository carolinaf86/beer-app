import React from 'react';
import {
    Box,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles
} from '@material-ui/core';
import './Placeholder.scss';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import {beerDetailStyles} from './BeerDetail';

const BeerDetailPlaceholder: React.FC = () => {

    const useStyles = makeStyles(beerDetailStyles);
    const classes = useStyles();

    return (
            <Card className={classes.root}>
                <CardContent>
                    <Box display="flex" flexDirection={{xs: 'column', md: 'row'}} p={4}>
                        <Box alignSelf="center" marginBottom={{xs: 6, md: 0}} className={`${classes.cardMedia} placeholder`}/>
                        <Box marginLeft={{md: 8, lg: 12}} flexGrow={1}>
                            <Box marginBottom={2} marginX={{xs: 'auto', md: 0}} className="h3 placeholder"/>
                            <Box marginBottom={6} marginX={{xs: 'auto', md: 0}} className="h6 placeholder"/>
                            <Box marginBottom={4} className="subtitle1 multi-line-xs placeholder"/>
                            <Box marginBottom={4}>
                                <List className={classes.list}>
                                    <ListItem><ListItemText><Box className="list-item-text placeholder"/></ListItemText></ListItem>
                                    <ListItem><ListItemText><Box className="list-item-text placeholder"/></ListItemText></ListItem>
                                    <ListItem><ListItemText><Box className="list-item-text placeholder"/></ListItemText></ListItem>
                                    <ListItem><ListItemText><Box className="list-item-text placeholder"/></ListItemText></ListItem>
                                </List>
                            </Box>
                            <Box marginBottom={2}>
                                <Box marginBottom={2} className="subtitle2 placeholder"/>
                                <List className="beer-details-list">
                                    <ListItem>
                                        <ListItemIcon><EmojiFoodBeverageIcon className="placeholder-icon"/></ListItemIcon>
                                        <ListItemText><Box className="list-item-text placeholder"/></ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><EmojiFoodBeverageIcon className="placeholder-icon"/></ListItemIcon>
                                        <ListItemText><Box className="list-item-text placeholder"/></ListItemText>
                                    </ListItem>
                                </List>
                            </Box>
                            <Box margin={4} marginX={'auto'} className="h6 placeholder multi-line-xs"/>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
    );
};

export default BeerDetailPlaceholder;