import React, { Component } from 'react';
import Auxilary from "../../../hoc/Auxilary/Auxilary";
import Button from "../../UI/Button/Button";
class OrderSummary extends Component {
    componentWillUpdate(){
        console.log('[OrderSummary] WillUpdate')
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map((igKey) => {
                return (<li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
                    : {this.props.ingredients[igKey]}
                </li>)
            })
        return (
            <Auxilary>
                <h1>Your Order</h1>
                <p>Your Order with delicious Ingredients:</p>
                <p><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.modalClosed}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continueClicked}>CONTINUE</Button>
            </Auxilary>
        )
    }

}

export default OrderSummary;