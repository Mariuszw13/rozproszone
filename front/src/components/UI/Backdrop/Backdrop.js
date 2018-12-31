/**
 * Created by mariusz on 26.03.18.
 */
import React from 'react';
import './Backdrop.css';

const backdrop = (props) => (
    props.show ? <div className="Backdrop" onClick={props.clicked}></div> : null

);

export default backdrop;
