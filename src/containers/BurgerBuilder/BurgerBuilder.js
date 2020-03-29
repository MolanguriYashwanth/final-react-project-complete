import React, { useState, useEffect,useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Auxilary from '../..//hoc/Auxilary/Auxilary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import withErrorHanlder from "../../hoc/WithErrorHandler/WithErrorHandler";
import axios from "../../axios-orders";

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);
    const dispatch = useDispatch();
    const onIngredientAddClick = (ingredientName) => {
        dispatch(actions.addIngredient(ingredientName))
    };
    const onIngredientRemoveClick = (ingredientName) => {
        dispatch(actions.removeIngredient(ingredientName));
    };
    const onInitIngredients = useCallback(()=>{dispatch(actions.initingredients()) },[dispatch]);

    const purchaseInit = () => {
        dispatch(actions.purchaseInit())
    };
    const setAuthRedirectPath = (path) => {
        dispatch(actions.setAuthRedirectPath(path))
    };
    const ings = useSelector(state =>{
        return state.burger.ingredients
    });
    const totalPrice = useSelector(state =>{
        return state.burger.totalPrice
    });
    const error = useSelector(state =>{
        return state.burger.error
    });
    const isUserAuthenticated = useSelector(state =>{
        return state.auth.token ? true : false
    });
    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])


    const updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igKey) => { return ingredients[igKey] })
            .reduce((sum, el) => { return sum + el }, 0);
        return sum > 0;
    }
    const purchaseHandler = () => {
        if (isUserAuthenticated) {
            setPurchasing(true);
        } else {
            setAuthRedirectPath('/checkout');
            props.history.push('/auth');

        }

    }

    const modalHandler = () => {
        setPurchasing(false);
    }
    const purchaseContinueHandler = () => {
        purchaseInit();
        props.history.push('/checkout');
    }

    const disabledInfo = { ...ings };
    for (let key in disabledInfo) {
        disabledInfo[key] = (disabledInfo[key] <= 0)
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if (ings) {
        burger = (<Auxilary>
            <Burger ingredients={ings} />
            <BuildControls
                price={totalPrice}
                removeIngredient={onIngredientRemoveClick}
                disabledInfo={disabledInfo}
                purchasable={updatePurchasable(ings)}
                isAuth={isUserAuthenticated}
                purchasing={purchaseHandler}
                addIngredient={onIngredientAddClick} />
        </Auxilary>);
        orderSummary = <OrderSummary
            price={totalPrice}
            modalClosed={modalHandler}
            continueClicked={purchaseContinueHandler}
            ingredients={ings} />;
    }

    return (
        <Auxilary>
            <Modal show={purchasing} modalClosed={modalHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxilary>
    );
}


export default withErrorHanlder(BurgerBuilder, axios);