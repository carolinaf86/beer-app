import React from 'react';
import {Box, Card, CardContent} from '@material-ui/core';
import './BeersListItem.scss';
import './Placeholder.scss';

class BeersListItemPlaceholder extends React.Component {

    render() {

        return (
            <Box m={2}>
                <Card>
                    <CardContent>
                        <Box display="flex"
                             flexDirection={{xs: 'column', md: 'row'}}
                             alignItems="center"
                        >
                            <Box marginRight={2} className="placeholder beers-list-item-media"/>
                            <Box textAlign={{xs: 'center', md: 'left'}} marginTop={{xs: 3, md: 0}}>
                                <Box m={2} className="placeholder h5"/>
                                <Box m={2} className="placeholder subtitle2"/>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        )
    }
};

export default BeersListItemPlaceholder;