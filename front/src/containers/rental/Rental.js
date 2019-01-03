import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getRentals} from '../../store/actions/';
import RentalsList from '../../components/rental/RentalsList';

class Rental extends Component {

    componentDidMount() {
        if (this.props.currentUser) {
            if (this.props.currentUser.role === 'client') {
                this.props.getRentals(this.props.currentUser.token, this.props.currentUser.email);
            } else {
                this.props.getRentals(this.props.currentUser.token, null);
            }
        }
    }

    render() {
        return (
            <div>
                <h1 style={{margin: 20}}>Rezerwacje</h1>
                <RentalsList rentals={this.props.rentals}/>
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
        getRentals: (token, email) => dispatch(getRentals(token, email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rental);
