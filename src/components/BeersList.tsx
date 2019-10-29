import React from 'react';
import {Box, Grid, InputAdornment, TextField, Typography} from '@material-ui/core';
import {Beer} from '../api/models/Beer';
import BeersListItem from './BeersListItem';
import debounce from 'lodash.debounce';
import BeersListItemPlaceholder from './BeersListItemPlaceholder';
import BeerService from '../api/services/BeerService';
import ErrorMessage from './ErrorMessage';
import InMemoryStore from '../services/InMemoryStore';
import {Link} from 'react-router-dom';
import Breadcrumbs, {Breadcrumb} from './Breadcrumbs';
import {SearchRounded} from '@material-ui/icons';

interface BeersListState {
    error?: string
    hasMore: boolean
    isLoading: boolean
    page: number
    pageSize: number
    beers: Beer[]
    query: string
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
            isLoading: true,
            page: 1,
            pageSize: 20,
            beers: [],
            query: ''
        };

        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);

        // Add debounce to loadBeers to avoid calling api too frequently when search input is changed
        this.loadBeers = debounce(this.loadBeers.bind(this), 500);

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
                (state: BeersListState) => ({...state, page: state.page + 1, isLoading: true}),
                () => loadBeers.bind(this)()
            );
        }
    }

    componentDidMount(): void {
        this._isMounted = true;
        this.loadBeers();
    }

    componentDidUpdate(prevProps: Readonly<BeersListProps>, prevState: Readonly<BeersListState>, snapshot?: any): void {
        // Reset state and reload beers when "showFavourites" prop or "query" state changes
        if (prevProps.showFavourites !== this.props.showFavourites || prevState.query !== this.state.query) {
            this.setState((state: BeersListState) => ({
                ...state,
                beers: [],
                page: 1,
                isLoading: true
            }), () => this.loadBeers());
        }
    }

    loadBeers() {

        this._isMounted && this.setState({...this.state, isLoading: true}, async () => {

            const {page, pageSize, beers, query} = this.state;
            const {showFavourites} = this.props;

            // If "showFavourites" is set, only load beers in favourites state array
            const favouriteIds = showFavourites ? InMemoryStore.getFavourites() : undefined;

            // If "showFavourites" is set but there are no ids in the InMemoryStore, set state with empty beers array
            // and return before attempting to fetch
            if (showFavourites && !(favouriteIds && favouriteIds.length)) {
                this.setState((state: BeersListState) => ({...state, isLoading: false, beers: []}));
                return;
            }

            // Fetch beers and update beers state or set error
            try {

                const nextBeers = await BeerService.find(page, pageSize, favouriteIds, query);

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

        // Remove beer from beers array on favourites view

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

    handleSearchInputChange(event: any) {
        this.setState({query: event.target.value, isLoading: true});
    }

    render() {
        const {beers, isLoading, error} = this.state;
        const {showFavourites} = this.props;

        const breadcrumbs = <Breadcrumbs breadcrumbs={this.generateBreadcrumbs()}/>;

        // Display error message if "error" is set
        if (error) return <div>{breadcrumbs}<ErrorMessage message={error}/></div>;

        // Generate placeholder items if "isLoading" is set

        const loadingItems = isLoading ?
            [0, 1, 2, 3, 4, 5].map(idx =>
                <Grid key={'placeholder-' + idx} item xs={12} sm={6} md={4}>
                    <BeersListItemPlaceholder/>
                </Grid>) :
            undefined;

        // Build search form if not in favourites view

        const searchForm = showFavourites ? undefined :
            <Box marginBottom={4}>
                <form noValidate autoComplete="off">
                    <TextField
                        id="name-search"
                        placeholder="Search for a beer by name..."
                        fullWidth
                        value={this.state.query}
                        onChange={this.handleSearchInputChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchRounded/></InputAdornment>,
                        }}
                    />
                </form>
            </Box>;

        // Display "no items found" message if after loading there are no items in "beers" array
        const noItemsFound = !(beers.length || isLoading) ?
            <Typography variant={'subtitle1'}>No matching beers were found.</Typography> : undefined;

        return (
            <div>
                {breadcrumbs}
                <Box marginBottom={2} marginLeft={2}>
                    <Typography variant={'h1'}>{showFavourites ? 'My Favourite Beers' : 'All Beers'}</Typography>
                </Box>
                {showFavourites && !InMemoryStore.getFavourites().length ?
                    <Box marginLeft={2} marginTop={4}><Link to={'/'}>Add some favourite beers</Link></Box> :
                    <div>
                        {searchForm}
                        {noItemsFound}
                        <Grid container spacing={2}>
                            {beers.map((beer: Beer) =>
                                <Grid key={beer.id} item xs={12} sm={6} md={4}>
                                    <BeersListItem model={beer}
                                                   onFavouriteToggled={showFavourites ? () => this.removeBeer(beer.id) : undefined}/>
                                </Grid>
                            )}
                            {loadingItems}
                        </Grid>
                    </div>
                }
            </div>
        );
    }

}

export default BeersList;