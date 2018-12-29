import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { setCurrentUser, setCurrentUserId} from "../../store/actions/users";
import './Login.css'

class Login extends Component {
    state = {
        login: 'emp1',
        password: 'emp1pass',
        message: null

    };

    moveToAnotherPage =(screen) => {
        this.props.history.push({pathname: screen});
    }

    getUserId = (loginResponse) => {
        axios.get('http://localhost:8080/users/login='+loginResponse.username, {headers: {'Authentication': loginResponse.jws}})
            .then(response => {
                if (loginResponse.roles[0].authority==="ROLE_EMPLOYEE") {
                    //console.log(response.data.employee);
                    this.props.setCurrUserId(response.data.employee.id);
                    this.moveToAnotherPage("/cars");
                } else if (loginResponse.roles[0].authority==="ROLE_MANAGER") {
                    this.props.setCurrUserId(response.data.manager.id);
                    this.moveToAnotherPage("/cars");
                }

            })
            .catch(error => console.log(error));
    }

    loginHandler = () => {

        axios.post('http://localhost:8080/authenticateUser?username='+this.state.login+'&password='+this.state.password)
            .then(response => {
                if (response.status===200) {
                    console.log(response);
                    this.props.onLoginSuccess(response.data);
                    this.getUserId(response.data);
                }
            })
            .catch(error => {
                const failMessage = <p style={{color: 'red'}}>Niepoprawny login lub hasło</p>
                this.setState({message: failMessage});
                console.log(error);
            });


    }

    /* logoutHandler = () => {
        axios.post('http://localhost:8080/logout', null, {headers: {'Authentication': this.props.currUser.jws}})
            .then(response => console.log(response))
            .catch(error => console.log(error));

        this.props.onLogout();
    } */


    render() {
        let itemsToRender = (
            <div>
                <div>
                    <TextField label="Email"
                               margin="normal"
                               onChange={(event, newValue) => this.setState({login: newValue})}/>
                </div>
                <div>
                    <TextField label="Hasło"
                               margin="normal"
                               onChange={(event, newValue) => this.setState({password: newValue})}
                               type="password"/>
                </div>
                <Button primary color="primary" variant="contained" onClick={this.loginHandler}>Login</Button>
            </div>);

        if (this.props.currUser) {
            itemsToRender = (
                <div>
                    <p>{"Logged in as "+ this.props.currUser.username}</p>
                    <Button label="Log out" primary color="primary" variant="contained" onClick={this.logoutHandler}/>
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