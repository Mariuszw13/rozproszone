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
                <h2>Dodaj samochód</h2>
            </div>
                <TextField style={textFieldStyle} label="Marka" required onChange={props.textFieldChangeHandler('make')}/>
            <div>
                <TextField style={textFieldStyle} label="Model" required onChange={props.textFieldChangeHandler('model')}/>
            </div>
            <div>
                <TextField style={textFieldStyle} label="Koszt wypożyczenia" required onChange={props.textFieldChangeHandler('rentCost')}/>
            </div>
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