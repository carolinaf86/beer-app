import React from 'react';
import {Card, Typography} from '@material-ui/core';
import {Beer} from '../api/Beer';

class BeersList extends React.Component {

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

    loadBeers() {

        this.setState({loading: true});

        this.setState(async (state, props) => {

            const {page, pageSize, beers} = state as any;

            try {
                const response: Response = await fetch(`${this.baseUrl}/beers/?page=${page}&per_page=${pageSize}`);

                if (!(response && response.ok)) {
                    this.setState({...state, error: true});
                    return;
                }

                const json = await response.json();

                const nextBeers: Beer[] = json.map((item: any) => new Beer(item));

                this.setState({
                    ...state,
                    isLoading: false,
                    // TODO "hasMore" logic
                    beers: [...beers, ...nextBeers]
                })

            } catch (err) {
                this.setState({...state, error: true});
            }

        });
    }

    render() {
        const {beers} = this.state as any;
        return (
            <div>
                <Typography variant={"h3"}>Beers</Typography>
                { beers.map((beer: Beer) =>
                    <Card key={beer.id}><Typography variant={'h5'}>{beer.name}</Typography> </Card>
                )}
            </div>
        );
    }

}

export default BeersList;