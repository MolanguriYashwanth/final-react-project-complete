import React from 'react';
import { connect } from "react-redux";
import CheckoutSumary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
const Checkout = props => {
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }
    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }
    let summary = <Redirect to="/" />
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    if (props.ings) {
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSumary
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                    ingredients={props.ings} />
                <Route path={props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        );
    }
    return summary;
}
const mapStateToProps = (state) => {
    return {
        ings: state.burger.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);