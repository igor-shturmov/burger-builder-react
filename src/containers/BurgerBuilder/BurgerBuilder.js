import React, {Component, Fragment} from 'react';

import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummmary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => this.setState({ingredients: response.data}))
            .catch(error => this.setState({ error: true }));
    }

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
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURI(i + '=' + encodeURI(this.state.ingredients[i])));
        }
        queryParams.push('price=' + this.state.totalPrice);
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        });
    };

    render() {
        const disableInfo = {...this.state.ingredients};
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls price={this.state.totalPrice}
                                   purchasable={this.state.purchasable}
                                   disabled={disableInfo}
                                   ordered={this.purchaseHandler}
                                   add={this.addIngredientHandler}
                                   remove={this.removeIngredientHandler}/>
                </Fragment>
            );
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                                         price={this.state.totalPrice}
                                         canceled={this.cancelPurchaseHandler}
                                         continued={this.continuePurchaseHandler}/>
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
