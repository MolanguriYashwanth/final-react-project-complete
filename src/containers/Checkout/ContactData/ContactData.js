import React, { useState } from 'react';
import {connect} from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import withErrorHanlder from "../../../hoc/WithErrorHandler/WithErrorHandler";
import Input from "../../../components/UI/Input/Input";
import * as actions from "../../../store/actions/index";
const ContactData = props => {
    const [orderForm,setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched:false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'

            },
            validation: {
                required: true
            },
            valid: false,
            value: '',
            touched:false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched:false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched:false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched:false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [{ value: 'fastest', displayValue: 'Fastest' },
                { value: 'cheapest', displayValue: 'Cheapest' }]
            },
            validation:{},
            value: 'fastest',
            valid: true,

        },
    }); 
    const [formIsValid,setFormIsValid]   = useState(false);
    const checkValidity = (value, rules)=> {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length >= rules.maxLength && isValid
        }
        return isValid;
    }
    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for (let formElement in orderForm) {
            formData[formElement] = orderForm[formElement]['value']
        }
        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: formData,
            userId:props.userId
        }

        props.onOrderBurger(order,props.userToken)
      
    }
    const inputChangedListner = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...orderForm
        }
        const updateFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updateFormElement.value = event.target.value;
        updateFormElement.valid = checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched=true;
        updatedOrderForm[inputIdentifier] = updateFormElement;

        let formIsValid= true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid=updatedOrderForm[inputIdentifier]['valid'] && formIsValid
        }
        setOrderForm(updatedOrderForm)
        setFormIsValid(formIsValid);
    }
    
        const formElementsArray = [];
        for (let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key]

            })
        }
        let form = (
            <form onSubmit={orderHandler}>
                {formElementsArray.map(formElement =>
                    (
                        <Input elementType={formElement.config.elementType}
                            onChangeListner={event =>
                            inputChangedListner(event, formElement.id)}
                            inValid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            elementConfig={formElement.config.elementConfig}
                            touched={formElement.config.touched}
                            value={formElement.config.value}
                            key={formElement.id} />
                    ))}
                <Button btnType="Success" formIsValid={formIsValid}>ORDER</Button>
            </form>
        )
        if (props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}

            </div>
        )
}
const mapStateToProps = (state, ownProps) => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice:state.burger.totalPrice,
        loading:state.order.loading,
        userToken:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      onOrderBurger:(orderData,token)=>{
        dispatch(actions.purchaseBurger(orderData,token))
    }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHanlder(ContactData, axios));