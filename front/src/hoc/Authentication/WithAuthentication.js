import  React, {Component} from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

const withAuthentication = (Component) => {
    class WithAuthentication extends Component {

        componentDidMount() {
            if (!this.props.currentUser) {
                this.props.history.push('/');
            }
        }

        render() {
            return (
                this.props.currentUser ? <Component {...this.props}/> : <div/>
            );
        }
    }

    const mapStateToProps = (state) => {
        return {
            currentUser: state.users.currentUser
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
        }
    }

    return withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuthentication));
}

export default withAuthentication;