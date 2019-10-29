import React from 'react';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Container, createMuiTheme, makeStyles} from '@material-ui/core';
import {blue, red} from '@material-ui/core/colors';
import {ThemeProvider} from '@material-ui/core/styles';
import BeersList from './components/BeersList';
import BeerDetail from './components/BeerDetail';
import ErrorMessage from './components/ErrorMessage';

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

const App: React.FC = () => {

    const useStyles = makeStyles({
        container: {
            marginTop: theme.spacing(5),
        },
    });
    const classes = useStyles();

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <NavBar/>
                    <Container className={classes.container}>
                        <Switch>
                            <Route path={'/'} exact component={BeersList}/>
                            <Route path={'/beers/:id'} component={BeerDetail}/>
                            <Route path={'/favourites'}><BeersList showFavourites={true}/></Route>
                            {/* Default route */}
                            <Route><ErrorMessage message={'Oops! Page not found.'}/></Route>
                        </Switch>
                    </Container>
            </ThemeProvider>
        </Router>
    );
};

export default App;
