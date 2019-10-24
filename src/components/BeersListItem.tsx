import React from 'react';
import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from '@material-ui/core';
import {Beer} from '../api/Beer';
import './BeersListItem.scss';

type BeersListItemProps = {
    model: Beer
}

class BeersListItem extends React.Component<BeersListItemProps, {}> {

    render() {
        const {model} = this.props;

        return (
            <Box m={2}>
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <Box display="flex"
                                 flexDirection={{xs: 'column', md: 'row'}}
                                 alignItems="center"
                            >
                                <CardMedia image={model.imageUrl} title={model.name} className="beers-list-item-media"/>
                                <Box textAlign={{xs: 'center', md: 'left'}} marginTop={{xs: 3, md: 0}}>
                                    <Typography variant={'h5'}>{model.name}</Typography>
                                    <Typography variant={'subtitle2'}>{model.tagline}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        )
    }
};

export default BeersListItem;