import React from 'react';
import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    createStyles, Theme,
    Typography,
    withStyles
} from '@material-ui/core';
import {Beer} from '../api/models/Beer';
import CustomLink from './CustomLink';
import FavouriteToggle from './FavouriteToggle';

import InMemoryStore from '../services/InMemoryStore'
import {WithStyles} from '@material-ui/core/styles/withStyles';

type BeersListItemState = {
    isFavourite: boolean
}

const styles = (theme: Theme) => createStyles({
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
        '@media (min-width: 960px)': {
            marginRight: theme.spacing(2)
        }
    }
});

interface BeersListItemProps extends WithStyles<typeof styles> {
    model: Beer
    onFavouriteToggled?: () => any
}

const BeersListItem = withStyles(styles)(class extends React.Component<BeersListItemProps, BeersListItemState> {

    constructor(props: BeersListItemProps) {
        super(props);
        this.state = {isFavourite: InMemoryStore.getIsFavourite(props.model.id)};
    }

    handleClick() {
        const {isFavourite} = this.state;
        const {model: {id}, onFavouriteToggled} = this.props;
        isFavourite ? InMemoryStore.removeFavourite(id) : InMemoryStore.addFavourite(id);
        this.setState((state: BeersListItemState) => ({...state, isFavourite: !isFavourite}));

        if (onFavouriteToggled) {
            onFavouriteToggled();
        }
    }

    render() {
        const {model, classes} = this.props;
        const {isFavourite} = this.state;

        return (
            <Card className={classes.root}>
                <Box display="flex" flexDirection={{xs: 'column', md: 'row'}}>
                    <Box flexGrow={1} order={{xs: 2, md: 1}}>
                        <CustomLink to={`/beers/${model.id}`} aria-label="Favourites">
                            <CardActionArea className={classes.cardActionArea}>
                                <CardContent>
                                    <Box display="flex"
                                         flexDirection={{xs: 'column', md: 'row'}}
                                         alignItems="center"
                                    >
                                        <CardMedia image={model.imageUrl} title={model.name}
                                                   className={classes.cardMedia}/>
                                        <Box textAlign={{xs: 'center', md: 'left'}} marginTop={{xs: 3, md: 0}}>
                                            <Typography variant={'h5'}>{model.name}</Typography>
                                            <Typography variant={'subtitle1'}>{model.tagline}</Typography>
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
        )
    }
});

export default BeersListItem;