import React, {Fragment, Component} from "react";

import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };
        reqInterseptor = null;
        resInterseptor = null;

        constructor(props) {
            super(props);
            this.reqInterseptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterseptor = axios.interceptors.response.use(res => res, error => (this.setState({error: error})))
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterseptor);
            axios.interceptors.response.eject(this.resInterseptor);
        }

        hideModalHandler() {
            this.setState({error: null});
        }

        render() {
            return (
                <Fragment>
                    <Modal show={this.state.error}
                           modalClosed={this.hideModalHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Fragment>
            );
        }
    }
};

export default withErrorHandler;
