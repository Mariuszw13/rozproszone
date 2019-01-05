import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";

const addRentalForm = (props) => {
    const buttonStyle = {marginRight: 10, marginTop: 20};
    const textFieldStyle = {marginTop: 20};
    if (props.car) {
        return (
            <div>
                <div>
                    <h2>Wypożycz samochód</h2>
                </div>
                <h3>
                    {props.car.make + ' ' + props.car.model}
                </h3>
                <TextField style={textFieldStyle}  type="date" label="Data rozpoczęcia" required InputLabelProps={{shrink: true}}
                           onChange={props.textFieldChangeHandler('rentalStart')}/>
                <div>
                    <TextField style={textFieldStyle} type="date" label="Data końca" required InputLabelProps={{shrink: true}}
                               onChange={props.textFieldChangeHandler('rentalEnd')}/>
                </div>
                <h4>
                    {'Koszt ' + props.rentalCost + ' zł'}
                </h4>
                <span>
                <Button color="secondary"
                        variant="contained"
                        style={buttonStyle}
                        onClick={props.cancelButtonHandler}>
                    Anuluj
                </Button>
                <Button onClick={props.submitButtonHandler}
                        disabled={props.submitDisabled}
                        color="primary"
                        style={buttonStyle}
                        variant="contained">
                    Wypożycz
                </Button>
            </span>
            </div>
        );
    } else {
        return <div/>;
    }
}

export default addRentalForm;