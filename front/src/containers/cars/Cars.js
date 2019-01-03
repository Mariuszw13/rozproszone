import React, { Component } from 'react';
import {getCars} from '../../store/actions'
import CarsList from '../../components/cars/CarsList';
import connect from "react-redux/es/connect/connect";

class Cars extends Component {

    componentDidMount() {
        if (this.props.currentUser) {
            this.props.getCars(this.props.currentUser.token);
        }
    }

    onListButtonClickHandler = (carId) => {
        console.log(carId);
    }

    render() {
        let buttonLabel = 'Wypożycz';
        if (this.props.currentUser && this.props.currentUser.role === 'employee') {
            buttonLabel = 'Wypożycz';
        }
        return (<div>
                <h1 style={{margin: 20}}>Samochody</h1>
                <CarsList cars={this.props.cars}
                          onButtonClickHandler={this.onListButtonClickHandler}
                          buttonLabel={buttonLabel}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCars: (token) => dispatch(getCars(token))
    };
}

const mapStateToProps = state => {
    return {
        cars: state.cars.cars,
        currentUser: state.users.currentUser
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
