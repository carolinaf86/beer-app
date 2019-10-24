import React from 'react';
import {Grid, GridList, Typography} from '@material-ui/core';
import {Beer} from '../api/Beer';
import BeersListItem from './BeersListItem';


type BeersListState = {
    error: boolean
    hasMore: boolean
    isLoading: boolean
    page: number
    pageSize: number
    beers: Beer[]
}

class BeersList extends React.Component<{}, BeersListState> {

    baseUrl = 'https://api.punkapi.com/v2';

    constructor(props: any) {
        super(props);

        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            page: 1,
            pageSize: 20,
            beers: []
        }
    }

    componentDidMount(): void {
        this.loadBeers();
    }

    async loadBeers() {

        this.setState({...this.state, isLoading: true}, async () => {

            const {page, pageSize, beers} = this.state;

            try {
                const response: Response = await fetch(`${this.baseUrl}/beers/?page=${page}&per_page=${pageSize}`);

                if (!(response && response.ok)) {
                    this.setState((state: BeersListState) => ({...state, error: true}));
                    return;
                }

                const json = await response.json();

                const nextBeers: Beer[] = json.map((item: any) => new Beer(item));

                this.setState((state: BeersListState) => ({
                    ...state,
                    isLoading: false,
                    beers: [...beers, ...nextBeers]
                }));

            } catch (err) {
                this.setState((state: BeersListState) => ({...state, error: true}));
            }
        });
    }

    render() {
        const {beers} = this.state as any;
        return (
            <div>
                <Typography variant={"h3"}>Beers</Typography>
                <Grid container spacing={2}>
                    {beers.map((beer: Beer) =>
                        <Grid item xs={12} sm={6} md={4}>
                            <BeersListItem key={beer.id} model={beer}/>
                        </Grid>
                    )}
                </Grid>
            </div>
        );
    }

}

export default BeersList;