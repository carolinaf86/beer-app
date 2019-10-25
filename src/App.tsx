import React from 'react';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Box, Container, createMuiTheme} from '@material-ui/core';
import {blue, red} from '@material-ui/core/colors';
import {ThemeProvider} from '@material-ui/core/styles';
import BeersList from './components/BeersList';
import BeerDetail from './components/BeerDetail';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: red,
    },
    spacing: 6,
    typography: {
        h1: {fontSize: '3rem'},
        h2: {fontSize: '2.5rem'},
        h3: {fontSize: '2rem'},
        h4: {fontSize: '1.75rem'},
        h5: {fontSize: '1.5rem'},
        h6: {fontSize: '1.25rem'},
        subtitle1: {fontSize: '1rem'},
        subtitle2: {fontSize: '1rem', fontWeight: 'bold'},
    }
});

export const apiBaseUrl = 'https://api.punkapi.com/v2';

const App: React.FC = () => {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <NavBar/>
                <Box marginTop={5}>
                    <Container>
                        <Switch>
                            <Route path={'/'} exact>
                                <BeersList/>
                            </Route>
                            <Route path={'/beers/:id'} component={BeerDetail}/>
                            <Route path={'/favourites'}>
                                <BeersList showFavourites={true}/>
                            </Route>
                        </Switch>
                    </Container>
                </Box>
            </ThemeProvider>
        </Router>
    );
};

export default App;
