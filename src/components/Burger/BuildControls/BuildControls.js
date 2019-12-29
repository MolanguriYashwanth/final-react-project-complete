import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' }
]
const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map((ctrl) =>
                <BuildControl 
                added ={()=>props.addIngredient(ctrl.type)}
                remove ={()=>props.removeIngredient(ctrl.type)}
                disabled={props.disabledInfo[ctrl.type]}
                label={ctrl.label}
                 key={ctrl.label}
                  />
            )}
            <button className={classes.OrderButton}
            onClick={props.purchasing}
             disabled={!props.purchasable}>{props.isAuth?'ORDER NOW':'SIGN UP'}</button>
        </div>
    )
}

export default buildControls;