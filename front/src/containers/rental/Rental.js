import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getRentals, cancelRental} from '../../store/actions/';
import RentalsList from '../../components/rental/list/RentalsList';

class Rental extends Component {

    componentDidMount() {
        this.getRentals();
    }

    getRentals = () => {
        if (this.props.currentUser) {
            if (this.props.currentUser.role === 'client') {
                this.props.getRentals(this.props.currentUser.token, this.props.currentUser.email);
            } else {
                this.props.getRentals(this.props.currentUser.token, null);
            }
        }
    }

    cancelRentalHandler = (rentalId) => {
        this.props.cancelRental(rentalId, this.props.currentUser.token);
        window.location.reload();
    }

    render() {
        return (
            <div>
                <h1 style={{margin: 20}}>Rezerwacje</h1>
                <RentalsList rentals={this.props.rentals} onButtonClickHandler={this.cancelRentalHandler}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.users.currentUser,
        rentals: state.rentals.rentals

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRentals: (token, email) => dispatch(getRentals(token, email)),
        cancelRental: (id, token) => dispatch(cancelRental(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rental);
