/**
 * Created by mariusz on 27.03.18.
 */
import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Navigation from '../../components/navigation/Navigation';
import Drawer from '../../components/UI/Drawer/Drawer';

const layout = (props) => {


    return (
        <div>
            <Drawer open={props.drawerOpen} onRequest={props.closeDrawer}/>
            <Navigation onNavigationClicked={props.drawerHandler}/>
            {props.children}
        </div>
    );
}

export default layout;


