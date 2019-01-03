import React, { Component } from 'react';
import {getCars, addCar} from '../../store/actions'
import CarsList from '../../components/cars/list/CarsList';
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import Modal from '../../components/UI/Modal/Modal';
import AddCarForm from '../../components/cars/form/AddCarForm';

class Cars extends Component {

    state = {
        addCarModalOpen: false,
        model: '',
        make: '',
        rentCost: 0
    }

    componentDidMount() {
        if (this.props.currentUser) {
            this.props.getCars(this.props.currentUser.token);
        }
    }

    onListButtonClickHandler = (carId) => {
        console.log(carId);
    }

    toggleModal = () => {
        this.setState({addCarModalOpen: !this.state.addCarModalOpen})
    }

    onSubmitCarClickHandler = () => {
        const newCar = {
            model: this.state.model,
            make: this.state.make,
            rentCost: this.state.rentCost,
            rentFlag: false
        };
        this.props.addCar(newCar, this.props.currentUser.token);
        this.props.getCars(this.props.currentUser.token);
        this.toggleModal();
    }

    areNewCarFieldsValid = () => {
        const cost = parseFloat(this.state.rentCost);
        return !isNaN(cost) && cost > 0 && this.state.make && this.state.model;
    }

    isEmployee = () => {
        return this.props.currentUser && this.props.currentUser.role === 'employee';
    }

    handleTextFieldChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        let additionalButton;
        if (this.isEmployee()) {
            const style = { marginLeft: 20 };
            additionalButton = <Button style={style} color="secondary" variant="contained" onClick={this.toggleModal}>Dodaj</Button>;
        }
        return (<div>
                <h1 style={{margin: 20}}>Samochody</h1>
                <CarsList cars={this.props.cars}
                          onButtonClickHandler={this.onListButtonClickHandler}
                          buttonLabel={"Wypożycz"}/>
                {additionalButton}
                <Modal open={this.state.addCarModalOpen} closeModalHandler={this.toggleModal}>
                    <AddCarForm textFieldChangeHandler={this.handleTextFieldChange}
                                cancelButtonHandler={this.toggleModal}
                                submitButtonHandler={this.onSubmitCarClickHandler}
                                submitDisabled={!this.areNewCarFieldsValid()}
                    />
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCars: (token) => dispatch(getCars(token)),
        addCar: (car, token) => dispatch(addCar(car, token))
    };
}

const mapStateToProps = state => {
    return {
        cars: state.cars.cars,
        currentUser: state.users.currentUser
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
