import React, {Fragment, Component} from "react";

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDraw: false
    };

    sideDrawOpenHandler = () => {
        this.setState({
            showSideDraw: true
        });
    };

    sideDrawCloseHandler = () => {
        this.setState(prevState => ({ showSideDraw: !prevState.showSideDraw }));
    };

    render() {
        return (
            <Fragment>
                <div>
                    <Toolbar clicked={this.sideDrawOpenHandler}/>
                    <SideDrawer showSideDraw={this.state.showSideDraw} closed={this.sideDrawCloseHandler}/>
                    Backdrop
                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default Layout;
