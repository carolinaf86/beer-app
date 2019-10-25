import React from 'react';
import {Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import './Placeholder.scss';
import './BeerDetail.scss';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';

function BeerDetailPlaceholder() {
    return (
        <Box m={2}>
            <Card>
                <CardContent>
                    <Box display="flex" flexDirection={{xs: 'column', md: 'row'}} p={4}>
                        <Box alignSelf="center" marginBottom={{xs: 6, md: 0}} className="beer-detail-media placeholder"/>
                        <Box marginLeft={{md: 8, lg: 12}} flexGrow={1}>
                            <Box marginBottom={2} marginX={{xs: 'auto', md: 0}} className="h3 placeholder"/>
                            <Box marginBottom={6} marginX={{xs: 'auto', md: 0}} className="h6 placeholder"/>
                            <Box marginBottom={4} className="subtitle1 multi-line-xs placeholder"/>
                            <Box marginBottom={4}>
                                <List className="beer-details-list">
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
        </Box>
    );
}

export default BeerDetailPlaceholder;