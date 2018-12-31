import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { setCurrentUser, setCurrentUserId} from "../../store/actions/index";
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

    getUserId = (loginResponse) => {
        axios.get('http://localhost:8080/users/login='+loginResponse.username, {headers: {'Authentication': loginResponse.jws}})
            .then(response => {
                if (loginResponse.roles[0].authority==="client") {
                    console.log('success');
                    //console.log(response.data.employee);
                    //this.props.setCurrUserId(response.data.employee.id);
                    //this.moveToAnotherPage("/cars");
                } else if (loginResponse.roles[0].authority==="employee") {
                    //this.props.setCurrUserId(response.data.manager.id);
                    //this.moveToAnotherPage("/cars");
                }

            })
            .catch(error => console.log(error));
    }

    loginHandler = () => {
        const address = 'http://localhost:8080/authenticateUser?username='+this.state.email+'&password='+this.state.password;
        console.log(address);
        axios.post(address)
            .then(response => {
                if (response.status===200 && response.data.hasOwnProperty('jws')) {
                    const currentUser = {
                        email: response.data.username,
                        token: response.data.jws,
                        role: response.data.roles[0].authority
                    };
                    this.props.onLoginSuccess(currentUser);
                    this.moveToAnotherPage("/cars");

                    //this.getUserId(response.data);
                }
            })
            .catch(error => {
                const failMessage = <p style={{color: 'red'}}>Niepoprawny email lub hasło</p>
                this.setState({message: failMessage});
                console.log(error);
            });


    }

    logoutHandler = () => {
        axios.post('http://localhost:8080/logout', null, {headers: {'Authentication': this.props.currUser.jws}})
            .then(response => console.log(response))
            .catch(error => console.log(error));

        this.props.onLogout();
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
                    <Button color="primary" variant="contained" onClick={this.logoutHandler}>Wyloguj</Button>
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
        onLoginSuccess: (currUser) => dispatch(setCurrentUser(currUser)),
        setCurrUserId: (id) => dispatch(setCurrentUserId(id)),
        onLogout: () =>dispatch(setCurrentUser(null))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);