import React from 'react';
import {Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from '@material-ui/core';
import {Beer} from '../api/Beer';
import './BeersListItem.scss';
import CustomLink from './CustomLink';
import FavouriteToggle from './FavouriteToggle';

import InMemoryStore from '../services/InMemoryStore'

type BeersListItemState = {
    isFavourite: boolean
}

type BeersListItemProps = {
    model: Beer
}

class BeersListItem extends React.Component<BeersListItemProps, BeersListItemState> {

    constructor(props: BeersListItemProps) {
        super(props);
        this.state = {isFavourite: InMemoryStore.getIsFavourite(props.model.id)};
    }

    handleClick() {
        const {isFavourite} = this.state;
        const {model:{id}} = this.props;
        isFavourite ? InMemoryStore.removeFavourite(id) : InMemoryStore.addFavourite(id);
        this.setState((state: BeersListItemState) => ({...state, isFavourite: !isFavourite}));
    }

    render() {
        const {model} = this.props;
        const {isFavourite} = this.state;

        return (
            <Box m={2}>
                <Card>
                    <Box display="flex" flexDirection={{xs: 'column', md: 'row'}}>
                        <Box flexGrow={1} order={{xs: 2, md: 1}}>
                            <CustomLink to={`/beers/${model.id}`} aria-label="Favourites">
                                <CardActionArea>
                                    <CardContent>
                                        <Box display="flex"
                                             flexDirection={{xs: 'column', md: 'row'}}
                                             alignItems="center"
                                        >
                                            <CardMedia image={model.imageUrl} title={model.name}
                                                       className="beers-list-item-media"/>
                                            <Box textAlign={{xs: 'center', md: 'left'}} marginTop={{xs: 3, md: 0}}>
                                                <Typography variant={'h5'}>{model.name}</Typography>
                                                <Typography variant={'subtitle2'}>{model.tagline}</Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </CustomLink>
                        </Box>
                        <Box order={{xs: 1, md: 2}} display="flex" justifyContent="flex-end">
                            <CardActions>
                                <FavouriteToggle onClick={this.handleClick.bind(this)} isFavourite={isFavourite}/>
                            </CardActions>
                        </Box>
                    </Box>
                </Card>
            </Box>
        )
    }
};

export default BeersListItem;