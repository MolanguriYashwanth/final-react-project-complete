import * as actionTypes from '../actions/actions';
import {updateObject} from "../utility";
const initialState={
    ingredients: null,
    error:false,
    totalPrice: 4,
    building:false
}
const INGREDIENTS_PRICES = {
    salad: 0.4,
    bacon: 0.6,
    meat: 1.3,
    cheese: 0.7
}
const reducer = (state=initialState,action)=>{
    switch(action.type){

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state,{error:true})
           
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state,{
                ingredients:{
                    salad:action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat
                },
                error:false,
                totalPrice: 4,
                building:false
            })
             
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {[action.ingredientName]:state.ingredients[action.ingredientName]+1}
            const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
            const updatedState = {
                ingredients:updatedIngredients,
                building:true,
                totalPrice:state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            }
            return updateObject(state,updatedState)
        case actionTypes.REMOVE_INGREDIENT:
                const decrementIngredient = {[action.ingredientName]:state.ingredients[action.ingredientName]-1}
                const decrementedIngredients = updateObject(state.ingredients,decrementIngredient);
                const updateddecrementState = {
                    ingredients:decrementedIngredients,
                    building:true,
                    totalPrice:state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
                }
                return updateObject(state,updateddecrementState)    
        default:
            return state;    


    }
}

export default reducer