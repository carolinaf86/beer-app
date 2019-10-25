import React from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core';
import {Beer} from '../api/models/Beer';
import {Link, RouteComponentProps} from 'react-router-dom';
import './BeerDetail.scss';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import BeerDetailPlaceholder from './BeerDetailPlaceholder';
import ErrorMessage from './ErrorMessage';
import FavouriteToggle from './FavouriteToggle';
import InMemoryStore from '../services/InMemoryStore';
import BeerService from '../api/services/BeerService';
import {HttpError} from '../api/services/ErrorService';

interface BeerDetailRouterProps {
    id: string
}

interface BeerDetailProps extends RouteComponentProps<BeerDetailRouterProps> {
}

interface BeerDetailState {
    model?: Beer
    error?: string | any[]
    isFavourite: boolean
}

class BeerDetail extends React.Component<BeerDetailProps, BeerDetailState> {

    constructor(props: any) {
        super(props);
        this.state = {
            model: undefined,
            isFavourite: false
        };
    }

    async componentDidMount(): Promise<void> {
        const {id} = this.props.match.params;

        try {

            const beer = await BeerService.findById(+id);
            const isFavourite = InMemoryStore.getIsFavourite((+id));

            this.setState((state: BeerDetailState) => ({...state, model: beer, isFavourite}));

        } catch (err) {
            this.setErrorState(err);
        }
    }

    setErrorState(err: Error) {

        let message: string | (string | JSX.Element)[] = 'Oops, something went wrong! Failed to load beer.';

        // Display "not found" message on both 400 and 404 status codes as unknown id in params returns 400 status
        if (err instanceof HttpError && err.statusCode && [400, 404].indexOf(err.statusCode) > -1) {
            message = ['The beer you requested does not exist. ', <Link to={'/'}>Find another beer.</Link>];
        }

        this.setState((state: BeerDetailState) => ({
            ...state,
            error: message
        }));
    }

    handleClick() {
        const {isFavourite, model} = this.state;
        if (!model) return;
        const {id} = model;
        isFavourite ? InMemoryStore.removeFavourite(id) : InMemoryStore.addFavourite(id);
        this.setState((state: BeerDetailState) => ({...state, isFavourite: !isFavourite}));
    }

    render() {

        const {error, model, isFavourite} = this.state;

        if (error) return <ErrorMessage message={error}/>

        if (!model) return <BeerDetailPlaceholder/>;

        const {
            name,
            imageUrl,
            tagline,
            firstBrewed,
            abv,
            ibu,
            description,
            volume,
            foodPairing,
            brewersTips
        } = model;

        return (
            <Box m={2}>
                <Card>
                    <CardContent>
                        <Box display="flex" flexDirection={{xs: 'column', md: 'row'}} p={4}>
                            <Box alignSelf="center" marginBottom={{xs: 6, md: 0}}>
                                <CardMedia image={imageUrl} title={name} className="beer-detail-media"/>
                            </Box>
                            <Box marginLeft={{md: 8, lg: 12}}>
                                <Box marginBottom={2} display="flex" flexDirection="row"
                                     justifyContent={{xs: 'center', md: 'left'}}>
                                        <Typography variant={'h3'}>{name}</Typography>
                                        <FavouriteToggle onClick={this.handleClick.bind(this)}
                                                         isFavourite={isFavourite}/>
                                </Box>
                                <Box marginBottom={6} textAlign={{xs: 'center', md: 'left'}}><Typography
                                    variant={'h6'}>{tagline}</Typography></Box>
                                <Box marginBottom={4}><Typography
                                    variant={'subtitle1'}>{description}</Typography></Box>
                                <Box marginBottom={4}>
                                    <List className="beer-details-list" aria-label={`${name} details list`}>
                                        <ListItem>
                                            <ListItemText>First brewed: <strong>{firstBrewed}</strong></ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText>ABV: <strong>{abv}</strong></ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText>IBU: <strong>{ibu}</strong></ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText>Volume: <strong>{volume.value} {volume.unit}</strong></ListItemText>
                                        </ListItem>
                                    </List>
                                </Box>
                                <Box marginBottom={2}>
                                    <Box marginBottom={2}>
                                        <Typography variant={'subtitle1'}>Suggested food pairings:</Typography>
                                    </Box>
                                    <List className="beer-details-list" aria-label={`${name} food pairings list`}>
                                        {foodPairing.map((item, idx) =>
                                            <ListItem key={idx}>
                                                <ListItemIcon><EmojiFoodBeverageIcon/></ListItemIcon>
                                                <ListItemText>{item}</ListItemText>
                                            </ListItem>
                                        )}
                                    </List>
                                </Box>
                                <Box padding={4} textAlign="center">
                                    <Typography variant={'subtitle1'}><em>"{brewersTips}"</em></Typography>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        )
    }
};

export default BeerDetail;