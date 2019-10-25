import React from 'react';
import {Box, Grid, Typography} from '@material-ui/core';
import {Beer} from '../api/models/Beer';
import BeersListItem from './BeersListItem';
import debounce from 'lodash.debounce';
import BeersListItemPlaceholder from './BeersListItemPlaceholder';
import BeerService from '../api/services/BeerService';
import ErrorMessage from './ErrorMessage';

type BeersListState = {
    error?: string
    hasMore: boolean
    isLoading: boolean
    page: number
    pageSize: number
    beers: Beer[]
}

class BeersList extends React.Component<{}, BeersListState> {

    // Track mounted state to avoid attempting to set state after component is unmounted
    private _isMounted: boolean;

    constructor(props: any) {
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

    loadBeers() {

        this._isMounted && this.setState({...this.state, isLoading: true}, async () => {

            const {page, pageSize, beers} = this.state;

            try {

                const nextBeers = await BeerService.find(page, pageSize);

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

    render() {
        const {beers, isLoading, error} = this.state;

        if (error) {
            return <ErrorMessage message={error}/>
        }

        const gridItems = isLoading ?
            [0, 1, 2, 3, 4, 5].map(idx =>
                <Grid key={'placeholder-' + idx} item xs={12} sm={6} md={4}>
                    <BeersListItemPlaceholder/>
                </Grid>) :
            undefined;

        return (
            <div>
                <Box marginBottom={2} marginLeft={2}>
                    <Typography variant={"h3"}>All Beers</Typography>
                </Box>
                <Grid container spacing={2}>
                    {beers.map((beer: Beer) =>
                        <Grid key={beer.id} item xs={12} sm={6} md={4}>
                            <BeersListItem model={beer}/>
                        </Grid>
                    )}
                    {gridItems}
                </Grid>
            </div>
        );
    }

}

export default BeersList;