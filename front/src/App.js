import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Rental from './containers/rental/client/Rental';
import Layout from './hoc/Layout/Layout'
import Login from './containers/login/Login';
import Account from './containers/account/Account'
import Cars from './containers/cars/Cars';
import withAuthentication from './hoc/Authentication/WithAuthentication';

class App extends Component {
    state = {
        drawerOpen: false,
    }

    toggleDrawerHandler = () => {
        this.setState({drawerOpen: !this.state.drawerOpen});
    }

    closeDrawerHandler = () => {
        this.setState({drawerOpen: false});
    }

    render() {

        return (
            <BrowserRouter>
                    <Layout drawerHandler={this.toggleDrawerHandler}
                            closeDrawer={this.closeDrawerHandler}
                            drawerOpen={this.state.drawerOpen}
                    >
                        <Route path="/" exact component={Login}/>
                        <Route path="/rental" exact component={withAuthentication(Rental)}/>
                        <Route path="/account" exact component={withAuthentication(Account)}/>
                        <Route path="/cars" exact component={withAuthentication(Cars)}/>
                    </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
