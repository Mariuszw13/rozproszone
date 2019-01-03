import * as React from 'react';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider/Divider";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";
import Button from "@material-ui/core/Button/Button";
import {calculateTotalCost, parseDate} from '../../utils/utils';


const rentalsList = (props) => {

    let rentalListItems;
    if (props.rentals) {
        rentalListItems = props.rentals.map(rental => {
            return (
                <div key={rental.id}>
                    <ListItem button={true}>
                        <ListItemText primary={rental.car.make + ' ' + rental.car.model} secondary={'Od ' + parseDate(rental.startDate) + ' do ' + parseDate(rental.endDate)}/>
                        <ListItemText primary={calculateTotalCost(rental.startDate, rental.endDate, rental.car.rentCost) + ' zł'}/>
                        <ListItemSecondaryAction>
                            <Button color="primary" variant="contained"
                                    onClick={props.onButtonClickHandler}>Anuluj</Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider/>
                </div>);
        });
    }

    return (
        <div className="clientsList">
            <List component="nav">
                {rentalListItems}
            </List>
        </div>
    )
}

export default rentalsList