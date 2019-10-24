import React from 'react';
import './App.scss';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Container, Typography} from '@material-ui/core';

const App: React.FC = () => {
    return (
        <Router>
            <NavBar/>
            <Container className="m-t-lg">
                <Switch>
                    <Route path={"/"} exact>
                        <Typography variant={'h2'}>
                            All beers
                        </Typography>
                    </Route>
                    <Route path={"/favourites"}>
                        <Typography variant={'h2'}>
                            My favourite beers
                        </Typography>
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
};

export default App;
