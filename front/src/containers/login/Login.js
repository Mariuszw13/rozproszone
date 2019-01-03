import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import React, { Component } from "react";
import { connect } from 'react-redux';
import { doLogin, doLogout} from "../../store/actions/index";
import './Login.css'

class Login extends Component {
    state = {
        email: 'jdoe@email.com',
        password: 'abcd',
        message: null

    };

    moveToAnotherPage =(screen) => {
        this.props.history.push({pathname: screen});
    }

    onLoginFailHandler = (error) => {
        const failMessage = <p style={{color: 'red'}}>Niepoprawny email lub hasło</p>
        this.setState({message: failMessage});
        console.log(error);
    }

    loginHandler = () => {
        this.props.loginHandler(this.state.email, this.state.password, this.moveToAnotherPage, this.onLoginFailHandler());
    }

    render() {
        let itemsToRender = (
            <div>
                <div>
                    <TextField label="Email"
                               margin="normal"
                               onChange={(event) => this.setState({email: event.target.value})}/>
                </div>
                <div>
                    <TextField label="Hasło"
                               margin="normal"
                               onChange={(event) => this.setState({password: event.target.value})}
                               type="password"/>
                </div>
                <Button color="primary" variant="contained" onClick={this.loginHandler}>Login</Button>
            </div>);

        if (this.props.currUser) {
            itemsToRender = (
                <div>
                    <p>{"Zalogowany jako "+ this.props.currUser.email}</p>
                    <Button color="primary" variant="contained" onClick={() => this.props.logoutHandler(this.props.currUser.token)}>Wyloguj</Button>
                </div>);
        }


        return (
            <div className="LoginScreen">
                {itemsToRender}
                {this.state.message}
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        loginError: state.users.loginError,
        currUser: state.users.currentUser

    };
};

const mapDispatchToProps = dispatch => {
    return {
        logoutHandler: (token) =>dispatch(doLogout(token)),
        loginHandler: (email, password, onLoginSuccess, onLoginFail) => dispatch(doLogin(email, password, onLoginSuccess, onLoginFail))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);