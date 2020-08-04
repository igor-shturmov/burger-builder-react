import React, { Component } from "react";

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../axios-orders';

class Orders extends Component {
    state = {
        orders: null,
        loading: false
    };

    componentWillMount() {
        this.setState({ loading: true });
        axios.get('orders.json')
            .then((res) => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ orders: fetchedOrders, loading: false })
            })
            .catch(() => this.setState({ loading: false }))
    }

    render() {
        let orders;

        if (this.state.loading) {
            orders = <Spinner/>;
        } else {
            orders =  (
                this.state.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price}/>)
            );
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
