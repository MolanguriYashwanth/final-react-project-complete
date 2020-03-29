import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "../../axios-orders";
import withErrorHanlder from "../../hoc/WithErrorHandler/WithErrorHandler";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
const Auth = props => {

    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
    });
    const [isSignUp, setIsSignUp] = useState(false);
    const checkValidity = (value, rules) => {
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
    const inputChangedListner = (event, inputIdentifier) => {
        const updatedControls = {
            ...controls,
            [inputIdentifier]: {
                ...controls[inputIdentifier],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[inputIdentifier].validation),
                touched: true
            }
        }
        setControls(updatedControls)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuthenticateUser(controls.email.value,
            controls.password.value, isSignUp)
    }

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    }

    const {building,authRedirectPath,setAuthRedirectPath} = props;
    useEffect(() => {
        if (!building && authRedirectPath !== '/') {
            setAuthRedirectPath();
        }
    }, [building,authRedirectPath,setAuthRedirectPath]);


    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]

        })
    }

    let form = formElementsArray.map(formElement =>
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
        ))

    if (props.loading) {
        form = <Spinner />
    }
    let errorMessage = null;
    if (props.error) {
        errorMessage = (<p>{props.error.message}</p>)
    }
    let authRediect = null;
    if (props.isUserAuthenticated) {
        authRediect = <Redirect to={props.authRedirectPath} />
    }
    return (
        <div className={classes.Auth}>
            {authRediect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button
                clicked={switchAuthModeHandler}
                btnType="Danger">SWITCH TO {isSignUp ? "SIGNUP" : "SIGNIN"}</Button>
        </div>

    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isUserAuthenticated: state.auth.token ? true : false,
        building: state.burger.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticateUser: (email, password, isSignUp) => {
            dispatch(actions.auth(email, password, isSignUp))
        },
        setAuthRedirectPath: () => {
            dispatch(actions.setAuthRedirectPath('/'))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHanlder(Auth, axios));