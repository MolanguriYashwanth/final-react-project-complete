import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxilary from '../..//hoc/Auxilary/Auxilary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import withErrorHanlder from "../../hoc/WithErrorHandler/WithErrorHandler";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    updatePurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map((igKey) => { return ingredients[igKey] })
            .reduce((sum, el) => { return sum + el }, 0);
        return sum >0 ;
    }
    purchaseHandler = () => {
        if(this.props.isUserAuthenticated){
            this.setState({ purchasing: true })
        }else{
            this.props.setAuthRedirectPath('/checkout');
            this.props.history.push('/auth');

        }
        
    }


    modalHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        this.props.purchaseInit();
        this.props.history.push('/checkout');
    }
    render() {
        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }
        let orderSummary = null;
        let burger =this.props.error?<p>Ingredients can't be loaded</p>: <Spinner/>
        if(this.props.ings){
            burger = (<Auxilary>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    price={this.props.totalPrice}
                    removeIngredient={this.props.onIngredientRemoveClick}
                    disabledInfo={disabledInfo}
                    purchasable={this.updatePurchasable(this.props.ings)}
                    isAuth={this.props.isUserAuthenticated}
                    purchasing={this.purchaseHandler}
                    addIngredient={this.props.onIngredientAddClick} />
            </Auxilary>);
            orderSummary = <OrderSummary
            price={this.props.totalPrice}
            modalClosed={this.modalHandler}
            continueClicked={this.purchaseContinueHandler}
            ingredients={this.props.ings} />;
        }
   
        return (
            <Auxilary>
                <Modal show={this.state.purchasing} modalClosed={this.modalHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilary>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ings: state.burger.ingredients,
        totalPrice:state.burger.totalPrice,
        error:state.burger.error,
        isUserAuthenticated:state.auth.token?true:false
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onIngredientAddClick: (ingredientName) => {
            dispatch(actions.addIngredient(ingredientName))
        },
        onIngredientRemoveClick: (ingredientName) => {
            dispatch(actions.removeIngredient(ingredientName));
        },
        onInitIngredients:()=>{
            dispatch(actions.initingredients())
        },
        purchaseInit: () => {
            dispatch(actions.purchaseInit())
        },
        setAuthRedirectPath:(path)=>{
            dispatch(actions.setAuthRedirectPath(path))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHanlder(BurgerBuilder,axios));