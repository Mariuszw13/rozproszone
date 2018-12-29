/**
 * Created by mariusz on 26.03.18.
 */
import React, { Component } from 'react';
import './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    /*shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }*/

    render() {
        let className = "Modal";
        if (this.props.wide) {
            className = "Modal-wide";
        }
            return (
                    <Aux>
                        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                        <div
                            className={className}
                            style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                                    opacity: this.props.show ? '1' : '0'}}>
                            {this.props.children}
                        </div>
                    </Aux>
                );
            }

}

export default Modal;