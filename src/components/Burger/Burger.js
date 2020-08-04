import React from "react";
import { withRouter } from 'react-router-dom';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(key => {
            return [...Array(props.ingredients[key])].map((_, index) => {
                return <BurgerIngredient key={key + index} type={key}/>
            })})
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (!transformedIngredients.length) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

export default withRouter(burger);
