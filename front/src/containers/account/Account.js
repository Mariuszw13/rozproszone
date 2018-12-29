import React, { Component } from 'react';
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";

class Account extends Component {
    state = {
        addButtonDisabled: true,
        email: '',
        firstName: '',
        surname: '',
        address: '',
        password: '',


    }

    render() {

        return (
            <div>
                <div>
                    <h2>Create account</h2>
                </div>
                <div>
                    <TextField label="E-mail" required onChange={this.handleTextFieldChange('email')}/>
                </div>
                <div>
                    <TextField label="Password" required onChange={this.handleTextFieldChange('password')}/>
                </div>
                <div>
                    <TextField label="First name" required onChange={this.handleTextFieldChange('firstName')}/>
                </div>
                <div>
                    <TextField label="Surname" required onChange={this.handleTextFieldChange('surname')}/>
                </div>
                <div>
                    <TextField label="Address" onChange={this.handleTextFieldChange('address')}/>
                </div>
                <div>
                    <Button onClick={this.onAddClientClickHandler}
                            style={{marginTop: 20}}
                            color="primary"
                            disabled={this.state.addButtonDisabled}
                            variant="contained">
                        Create account
                    </Button>
                </div>
            </div>
        );
    }

    handleTextFieldChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
        this.checkAllRequiredFields();
    };

    checkAllRequiredFields = () => {
        if (!this.isFieldEmpty(this.state.email) && !this.isFieldEmpty(this.state.firstName)
            && !this.isFieldEmpty(this.state.surname) && !this.isFieldEmpty(this.state.password)) {
            this.setState({addButtonDisabled: false});
        }
    }

    isFieldEmpty = (field) => {
        return field === null || field === '';
    }

    onAddClientClickHandler = () => {
        const client = {
            firstName: this.state.firstName,
            surname: this.state.surname,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
        };
    }
}

export default Account;
