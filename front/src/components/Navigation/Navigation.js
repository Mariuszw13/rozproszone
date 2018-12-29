/**
 * Created by mariusz on 27.03.18.
 */
import React from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import MenuIcon from '@material-ui/icons/Menu';

const Navigation = (props) => {

    const widthStyle = {
        width: 200
    };


    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu" onClick={props.onNavigationClicked}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Wypożyczalnia
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );

};

export default Navigation;