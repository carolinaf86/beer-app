import React from 'react';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Box, Container, createMuiTheme, Typography} from '@material-ui/core';
import {blue, red} from '@material-ui/core/colors';
import {ThemeProvider} from '@material-ui/core/styles';
import BeersList from './components/BeersList';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: red,
    },
    spacing: 6
});

const App: React.FC = () => {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <NavBar/>
                <Box marginTop={5}>
                    <Container>
                        <Switch>
                            <Route path={"/"} exact>
                                <BeersList/>
                            </Route>
                            <Route path={"/favourites"}>
                                <Typography variant={'h2'}>
                                    My favourite beers
                                </Typography>
                            </Route>
                        </Switch>
                    </Container>
                </Box>
            </ThemeProvider>
        </Router>
    );
};

export default App;
