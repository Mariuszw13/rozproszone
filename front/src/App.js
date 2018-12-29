import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Rental from './containers/rental/client/Rental';
import Layout from './hoc/Layout/Layout'
import Login from './containers/login/Login';
import Account from './containers/account/Account'

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
                <div>
                    <Layout drawerHandler={this.toggleDrawerHandler}
                            closeDrawer={this.closeDrawerHandler}
                            drawerOpen={this.state.drawerOpen}
                    >
                        <Route path="/" exact component={Rental}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/account" exact component={Account}/>
                    </Layout>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
