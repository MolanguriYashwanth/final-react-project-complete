import * as actionTypes from "./actions";
import axios from "../../axios-orders";


export const addIngredient= (ingredientName) => {
    return{type:actionTypes.ADD_INGREDIENT,ingredientName:ingredientName}
}

export const removeIngredient= (ingredientName) => {
    return{type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingredientName}
}

export const fetchIngredientsFailed =()=>{
    return {type:actionTypes.FETCH_INGREDIENTS_FAILED}
}

const setIngredients = (ingredients)=>{
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}
export const initingredients = ()=>{
    //const AuthStr = 'Bearer ' + USER_TOKEN;
    return dispatch =>{
           axios.get('ingredients/').then((response) => {
            var responseOutput = response.data[0]; 
            delete responseOutput['_id'];
            dispatch(setIngredients(responseOutput))
            //this.setState({ ingredients: responseOutput })
        }).catch((err)=>{
            dispatch(fetchIngredientsFailed())
            //this.setState({error:true})
        })
    }
}