import React from 'react';
import {Box, Grid, Typography} from '@material-ui/core';
import {Beer} from '../api/models/Beer';
import BeersListItem from './BeersListItem';
import debounce from 'lodash.debounce';
import BeersListItemPlaceholder from './BeersListItemPlaceholder';
import BeerService from '../api/services/BeerService';
import ErrorMessage from './ErrorMessage';
import InMemoryStore from '../services/InMemoryStore';
import {Link} from 'react-router-dom';
import Breadcrumbs, {Breadcrumb} from './Breadcrumbs';

interface BeersListState {
    error?: string
    hasMore: boolean
    isLoading: boolean
    page: number
    pageSize: number
    beers: Beer[]
}

interface BeersListProps {
    showFavourites?: boolean
}

class BeersList extends React.Component<BeersListProps, BeersListState> {

    // Track mounted state to avoid attempting to set state after component is unmounted
    private _isMounted: boolean;

    constructor(props: BeersListProps) {
        super(props);

        this._isMounted = false;

        this.state = {
            error: undefined,
            hasMore: true,
            isLoading: false,
            page: 1,
            pageSize: 20,
            beers: []
        };

        // Bind to on scroll event for infinite scroll
        window.onscroll = debounce((this.onScroll.bind(this)), 100);
    }

    onScroll() {
        const {
            loadBeers,
            state: {
                error,
                isLoading,
                hasMore,
            },
        } = this;

        // Return early if there is an error, loading is in progress or there are no more items
        if (error || isLoading || !hasMore) return;

        // If scroll is in bottom 100px of page, load more beers
        if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 100) {
            // Increment page number
            this._isMounted && this.setState(
                (state: BeersListState) => ({...state, page: state.page + 1}),
                () => loadBeers.bind(this)()
            );
        }
    }

    componentDidMount(): void {
        this._isMounted = true;
        this.loadBeers();
    }

    componentDidUpdate(prevProps: Readonly<BeersListProps>, prevState: Readonly<BeersListState>, snapshot?: any): void {
        // Reset state and reload beers when "showFavourites" prop changes
        if (prevProps.showFavourites !== this.props.showFavourites) {
            this.setState((state: BeersListState) => ({...state, beers: [], page: 1}), () => this.loadBeers());
        }
    }

    loadBeers() {

        this._isMounted && this.setState({...this.state, isLoading: true}, async () => {

            const {page, pageSize, beers} = this.state;
            const {showFavourites} = this.props;

            // If "showFavourites" is set, only load beers in favourites state array
            const favouriteIds = showFavourites ? InMemoryStore.getFavourites() : undefined;

            if (showFavourites && !(favouriteIds && favouriteIds.length)) {
                this.setState((state: BeersListState) => ({...state, isLoading: false, beers: []}));
                return;
            }

            try {

                const nextBeers = await BeerService.find(page, pageSize, favouriteIds);

                // If the number of items requested was returned, we assume there are more
                const hasMore = nextBeers.length === pageSize;

                this._isMounted && this.setState((state: BeersListState) => ({
                    ...state,
                    isLoading: false,
                    hasMore,
                    beers: [...beers, ...nextBeers] // Merge new items into the existing beers array
                }));

            } catch (err) {
                this.setErrorState(err)
            }
        });
    }

    setErrorState(err: Error) {
        const message = 'Oops, something went wrong! Failed to load beers.';
        this._isMounted && this.setState((state: BeersListState) => ({...state, error: message}));
    }

    componentWillUnmount(): void {
        this._isMounted = false;
    }

    removeBeer(id: number) {
        // Ensure "unfavourited" beers are removed from beers array on favourites view

        if (!this.props.showFavourites) return;

        this.setState((state: BeersListState) => {
           const idx = state.beers.findIndex(beer => beer.id === id);
           const beers = [...state.beers];
           beers.splice(idx, 1);
           return {...state, beers};
        });
    }

    generateBreadcrumbs(): Breadcrumb[] {
        const breadcrumbs = [{path: '/', title: 'Home'}];
        if (this.props.showFavourites) {
            breadcrumbs.push({path: '/favourites', title: 'Favourites'})
        }
        return breadcrumbs;
    }

    render() {
        const {beers, isLoading, error} = this.state;
        const {showFavourites} = this.props;

        const breadcrumbs = <Breadcrumbs breadcrumbs={this.generateBreadcrumbs()}/>;

        if (error) {
            return <div>{breadcrumbs}<ErrorMessage message={error}/></div>
        }

        const loadingItems = isLoading ?
            [0, 1, 2, 3, 4, 5].map(idx =>
                <Grid key={'placeholder-' + idx} item xs={12} sm={6} md={4}>
                    <BeersListItemPlaceholder/>
                </Grid>) :
            undefined;

        return (
            <div>
                {breadcrumbs}
                <Box marginBottom={2} marginLeft={2}>
                    <Typography variant={'h1'}>{showFavourites ? 'My Favourite Beers' : 'All Beers'}</Typography>
                </Box>
                {showFavourites && !InMemoryStore.getFavourites().length ?
                    <Box marginLeft={2} marginTop={4}><Link to={'/'}>Add some favourite beers</Link></Box> :
                    <Grid container spacing={2}>
                        {beers.map((beer: Beer) =>
                            <Grid key={beer.id} item xs={12} sm={6} md={4}>
                                <BeersListItem model={beer} onFavouriteToggled={showFavourites ? () => this.removeBeer(beer.id) : undefined}/>
                            </Grid>
                        )}
                        {loadingItems}
                    </Grid>
                }
            </div>
        );
    }

}

export default BeersList;