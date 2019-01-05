import React, {Component, Suspense} from 'react';
import {getCars, addCar, addRental} from '../../store/actions'
import CarsList from '../../components/cars/list/CarsList';
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import Modal from '../../components/UI/Modal/Modal';
import moment from 'moment';
import {calculateTotalCost} from '../../utils/utils'
const AddCarForm = React.lazy(() => import('../../components/cars/form/AddCarForm'));
const AddRentalForm = React.lazy(() => import('../../components/rental/form/AddRentalForm'));

class Cars extends Component {

    state = {
        addCarModalOpen: false,
        addRentalModalOpen: false,
        model: '',
        make: '',
        rentCost: 0,
        selectedCar: null,
        rentalStart: null,
        rentalEnd: null
    }

    componentDidMount() {
        if (this.props.currentUser) {
            this.props.getCars(this.props.currentUser.token);
        }
    }

    toggleCarModal = () => {
        this.setState({addCarModalOpen: !this.state.addCarModalOpen})
    }

    toggleRentalModal = () => {
        this.setState({addRentalModalOpen: !this.state.addRentalModalOpen});
    }

    onRentButtonClicked = (selectedCar) => {
        this.setState({selectedCar: selectedCar});
        this.toggleRentalModal();
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
        this.toggleCarModal();
    }

    onSubmitRentalClickHandler = () => {
        const startDate = moment(this.state.rentalStart);
        const endDate = moment(this.state.rentalEnd);
        const newRental = {
            client: {
                id: 0
            },
            startDate: startDate.toDate(),
            endDate: endDate.toDate(),
            car: {
                id:this.state.selectedCar.id
            }
        }
        this.props.addRental(newRental, this.props.currentUser.email, this.props.currentUser.token);
        this.toggleRentalModal();
    }

    areNewCarFieldsValid = () => {
        const cost = parseFloat(this.state.rentCost);
        return !isNaN(cost) && cost > 0 && this.state.make && this.state.model;
    }

    areNewRentalDatesValid = () => {
        const startDate = moment(this.state.rentalStart);
        const endDate = moment(this.state.rentalEnd);
        return startDate.isBefore(endDate);
    }

    isEmployee = () => {
        return this.props.currentUser && this.props.currentUser.role === 'employee';
    }

    handleTextFieldChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    rentalCostHandler = () => {
        if (this.state.selectedCar && this.state.rentalStart && this.state.rentalEnd) {
            return calculateTotalCost(this.state.rentalStart, this.state.rentalEnd, this.state.selectedCar.rentCost)
        } else {
            return 0;
        }
    }

    render() {
        let additionalButton;
        if (this.isEmployee()) {
            const style = { marginLeft: 20 };
            additionalButton = <Button style={style} color="secondary" variant="contained" onClick={this.toggleCarModal}>Dodaj</Button>;
        }
        return (<div>
                <h1 style={{margin: 20}}>Samochody</h1>
                <CarsList cars={this.props.cars}
                          onButtonClickHandler={this.onRentButtonClicked}
                          buttonVisible={!this.isEmployee()}
                          buttonLabel={"Wypożycz"}/>
                {additionalButton}
                <Modal open={this.state.addCarModalOpen} closeModalHandler={this.toggleCarModal}>
                    <Suspense fallback={<div>Ładuję...</div>}>
                        <AddCarForm textFieldChangeHandler={this.handleTextFieldChange}
                                    cancelButtonHandler={this.toggleCarModal}
                                    submitButtonHandler={this.onSubmitCarClickHandler}
                                    submitDisabled={!this.areNewCarFieldsValid()}
                        />
                    </Suspense>
                </Modal>
                <Modal open={this.state.addRentalModalOpen} closeModalHandler={this.toggleRentalModal}>
                    <Suspense fallback={<div>Ładuję...</div>}>
                        <AddRentalForm car={this.state.selectedCar}
                                       textFieldChangeHandler={this.handleTextFieldChange}
                                       cancelButtonHandler={this.toggleRentalModal}
                                       submitButtonHandler={this.onSubmitRentalClickHandler}
                                       submitDisabled={!this.areNewRentalDatesValid()}
                                       rentalCost={this.rentalCostHandler()}
                        />
                    </Suspense>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCars: (token) => dispatch(getCars(token)),
        addCar: (car, token) => dispatch(addCar(car, token)),
        addRental: (rental, email, token) => dispatch(addRental(rental, email, token))
    };
}

const mapStateToProps = state => {
    return {
        cars: state.cars.cars,
        currentUser: state.users.currentUser
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
