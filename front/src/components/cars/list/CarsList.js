import * as React from 'react';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider/Divider";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";
import './CarsList.css'
import Button from "@material-ui/core/Button/Button";


const carsList = (props) => {

    let carListItems;
    if (props.cars) {
        carListItems = props.cars.map(car => {
            return (
                <div key={car.id}>
                    <ListItem button={true}>
                        <ListItemText primary={car.make + ' ' + car.model} secondary={car.rentCost + " zł / 24 h"}/>
                        <ListItemSecondaryAction>
                            <Button
                                disabled={car.rentFlag}
                                color="primary" variant="contained"
                                style={props.buttonVisible ? {} : {visibility: 'hidden'}}
                                onClick={() => props.onButtonClickHandler(car)}>{props.buttonLabel}
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider/>
                </div>);
        });
    }

    return (
        <div className="clientsList">
            <List component="nav">
                {carListItems}
            </List>
        </div>
    )
}

export default carsList