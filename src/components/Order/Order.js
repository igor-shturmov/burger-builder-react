import React from "react";

import classes from './Order.module.css';

const order = (props) => {
    let transformedIngredients = [];

    for (let ingredientName in props.ingredients) {
        transformedIngredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientsOutput = transformedIngredients.map(ig => {
       return <span key={ig.name} className={classes.Ingredient}>{ig.name} ({ig.amount})</span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
};

export default order;
