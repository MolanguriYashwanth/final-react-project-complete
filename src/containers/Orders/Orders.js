import React, { useEffect } from 'react';
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHanlder from "../../hoc/WithErrorHandler/WithErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = props => {
    const {fetchOrders,userToken,userId} = props;
    useEffect(() => {
        fetchOrders(userToken, userId)
    }, [fetchOrders,userToken,userId]);

    let orders = <Spinner />;
    if (!props.loading) {
        orders =
            props.orders.map(order =>
                (<Order
                    ingredients={order.ingredients}
                    price={order.price}
                    key={order['_id']} />)
            )
    }

    return (
        <div>
            {orders}
        </div>


    );
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        userToken: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (token, userId) => { dispatch(actions.fetchOrders(token, userId)) }
    }
}

//export default Orders;
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHanlder(Orders, axios));