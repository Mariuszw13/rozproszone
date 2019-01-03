import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import './AddCarForm.css';

const addCarForm = (props) => {
    const buttonStyle = {marginRight: 10, marginTop: 20};
    const textFieldStyle = {margin: 'auto'};
    return (
        <div className="add-car-form">
            <div>
                <h2>Wypożycz samochód</h2>
            </div>
            <h3>
                {props.carName}
            </h3>
                <TextField style={textFieldStyle} type="date" label="Data rozpoczęcia" required onChange={props.textFieldChangeHandler('startDate')}/>
            <div>
                <TextField style={textFieldStyle} type="date" label="Data końca" required onChange={props.textFieldChangeHandler('endDate')}/>
            </div>
            <h4>
                {'Koszt' + props.cost}
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
                    Dodaj
                </Button>
            </span>
        </div>
    );
}

export default addCarForm;