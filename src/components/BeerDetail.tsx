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
import {Beer} from '../api/Beer';
import {Link, RouteComponentProps} from 'react-router-dom';
import {apiBaseUrl} from '../App';
import './BeerDetail.scss';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import BeerDetailPlaceholder from './BeerDetailPlaceholder';
import ErrorMessage from './ErrorMessage';

interface BeerDetailRouterProps {
    id: string
}

interface BeerDetailProps extends RouteComponentProps<BeerDetailRouterProps> {
}

interface BeerDetailState {
    model?: Beer
    error?: string | any[]
}

class BeerDetail extends React.Component<BeerDetailProps, BeerDetailState> {

    constructor(props: any) {
        super(props);
        this.state = {
            model: undefined
        };
    }

    async componentDidMount(): Promise<void> {
        const {id} = this.props.match.params;

        try {

            const response: Response = await fetch(`${apiBaseUrl}/beers/${id}`);

            if (!(response && response.ok)) {
                const message = response.status === 400 ?
                    ['The beer you requested does not exist. ', <Link to={'/'}>Find another beer.</Link>] :
                    undefined;
                this.setError(message);
                return;
            }

            const json = await response.json();

            // Set error state if json is not an array with one item
            if (!Array.isArray(json) && json.length === 1) {
                this.setError();
                return;
            }

            const beer = new Beer(json[0]);

            this.setState((state: BeerDetailState) => ({...state, model: beer}));

        } catch (err) {
            this.setError();
        }
    }

    setError(message?: string | any[]) {
        // TODO set error message and display
        this.setState((state: BeerDetailState) => ({
            ...state,
            error: message || 'Oops, something went wrong! Failed to load beer.'
        }));
    }

    render() {

        const {error, model} = this.state;

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
                                <Box marginBottom={2} textAlign={{xs: 'center', md: 'left'}}><Typography
                                    variant={'h3'}>{name}</Typography></Box>
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