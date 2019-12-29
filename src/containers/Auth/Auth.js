import React, { Component } from 'react';
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";
import axios from "../../axios-orders";
import withErrorHanlder from "../../hoc/WithErrorHandler/WithErrorHandler";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
class Auth extends Component {
    state = {
        controls: {
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
        },
        isSignUp:false
    }
    checkValidity(value, rules) {
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
    inputChangedListner = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls,
            [inputIdentifier]: {
                ...this.state.controls[inputIdentifier],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls })
    }

    submitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuthenticateUser(this.state.controls.email.value,
             this.state.controls.password.value,this.state.isSignUp)
    }

    switchAuthModeHandler = () =>{
        this.setState(prevState =>{
            return {isSignUp:!prevState.isSignUp}
        })
    }

    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPath !=='/'){
            this.props.setAuthRedirectPath();
        }
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]

            })
        }

        let form = formElementsArray.map(formElement =>
            (
                <Input elementType={formElement.config.elementType}
                    onChangeListner={event =>
                        this.inputChangedListner(event, formElement.id)}
                    inValid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    elementConfig={formElement.config.elementConfig}
                    touched={formElement.config.touched}
                    value={formElement.config.value}
                    key={formElement.id} />
            ))

            if(this.props.loading){
                form=<Spinner/>
            }
            let errorMessage = null;
            if(this.props.error){
                errorMessage = (<p>{this.props.error.message}</p>)
            }
            let authRediect = null;
            if(this.props.isUserAuthenticated){
                authRediect = <Redirect to={this.props.authRedirectPath}/>
            }
        return (
            <div className={classes.Auth}>
                 {authRediect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                clicked={this.switchAuthModeHandler}
                btnType="Danger">SWITCH TO {this.state.isSignUp?"SIGNUP":"SIGNIN"}</Button>
            </div >
           
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.auth.loading,
        error:state.auth.error,
        isUserAuthenticated:state.auth.token?true:false,
        building:state.burger.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticateUser: (email, password,isSignUp) => {
            dispatch(actions.auth(email, password,isSignUp))
        },
        setAuthRedirectPath:()=>{
            dispatch(actions.setAuthRedirectPath('/'))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHanlder(Auth, axios));