/**
 * Created by mariusz on 26.03.18.
 */
import React from 'react';
import './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {


        let className = "Modal";
        if (props.wide) {
            className = "Modal-wide";
        }
            return (
                    <Aux>
                        <Backdrop open={props.open} clicked={props.closeModalHandler}/>
                        <div
                            className={className}
                            style={{transform: props.open ? 'translateY(0)' : 'translateY(-100vh)',
                                    opacity: props.open ? '1' : '0'}}>
                            {props.children}
                        </div>
                    </Aux>
                );

}

export default modal;