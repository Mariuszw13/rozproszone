/**
 * Created by mariusz on 27.03.18.
 */
import React from 'react';
import Drawer from '@material-ui/core/Drawer/Drawer';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import './Drawer.css';

const drawer = (props) => {

    return (
        <div className="Drawer">
            <Drawer
                docked={false}
                width={400}
                open={props.open}
                onClose={props.onRequest}
            >
                <MenuItem><a href="/">Lista leków</a></MenuItem>
                <MenuItem><a href="/search">Wyszukaj lek</a></MenuItem>
            </Drawer>
        </div>
    );
};

export default drawer;