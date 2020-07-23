import React, {Component, Fragment} from 'react';

import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummmary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    addIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        let oldPrice = this.state.totalPrice;
        const ingredients = {...this.state.ingredients};
        ingredients[type] = oldCount + 1;

        this.setState({
            ingredients: ingredients,
            totalPrice: oldPrice + INGREDIENT_PRICES[type]
        });

        this.updatePurchaseState(ingredients);
    };

    updatePurchaseState(ingredients) {
        const count = Object.values(ingredients).reduce((acc, curr) => acc + curr, 0);

        this.setState({purchasable: !!count})
    }

    removeIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];

        if (oldCount) {
            let oldPrice = this.state.totalPrice;
            const ingredients = {...this.state.ingredients};
            ingredients[type] = oldCount - 1;

            this.setState({
                ingredients: ingredients,
                totalPrice: oldPrice - INGREDIENT_PRICES[type]
            });

            this.updatePurchaseState(ingredients);
        }
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    };

    continuePurchaseHandler = () => {
        alert('Continue purchase!');
        this.setState({purchasing: false});
    };

    render() {
        const disableInfo = {...this.state.ingredients};
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                                  price={this.state.totalPrice}
                                  canceled={this.cancelPurchaseHandler}
                                  continued={this.continuePurchaseHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls add={this.addIngredientHandler}
                               remove={this.removeIngredientHandler}
                               price={this.state.totalPrice}
                               purchasable={this.state.purchasable}
                               disabled={disableInfo}
                               ordered={this.purchaseHandler}/>
            </Fragment>
        );
    }
}

export default BurgerBuilder;
