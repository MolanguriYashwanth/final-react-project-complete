import React from 'react';
import Auxilary from "../../../hoc/Auxilary/Auxilary";
import Button from "../../UI/Button/Button";
const OrderSummary = props => {
    // componentWillUpdate(){
    //     console.log('[OrderSummary] WillUpdate')
    // }

        const ingredientSummary = Object.keys(props.ingredients)
            .map((igKey) => {
                return (<li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
                    : {props.ingredients[igKey]}
                </li>)
            })
        return (
            <Auxilary>
                <h1>Your Order</h1>
                <p>Your Order with delicious Ingredients:</p>
                <p><strong>Total Price:{props.price.toFixed(2)}</strong></p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={props.modalClosed}>CANCEL</Button>
                <Button btnType="Success" clicked={props.continueClicked}>CONTINUE</Button>
            </Auxilary>
        )
    

}

export default OrderSummary;