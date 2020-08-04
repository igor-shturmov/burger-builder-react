import React from "react";

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div className={classes.BurgerContainer}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.onCheckoutCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.onCheckoutContinued}>CONTINUE</Button>
        </div>
    );
};

export default checkoutSummary;
