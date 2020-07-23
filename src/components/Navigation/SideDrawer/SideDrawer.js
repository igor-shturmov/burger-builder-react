import React, { Fragment } from "react";

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.showSideDraw) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Fragment>
            <Backdrop show={props.showSideDraw} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Fragment>
    );
};

export default sideDrawer;
