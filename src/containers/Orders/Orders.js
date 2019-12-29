import React, { Component } from 'react';
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHanlder from "../../hoc/WithErrorHandler/WithErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {

    // state ={
    //         orders:[],
    //         loading:true
    // }
    componentDidMount() {
        console.log("userToken",this.props);
        this.props.fetchOrders(this.props.userToken,this.props.userId)
        // axios.get('/build/getburgers').then((response) => {
        //     console.log('response',response.data);
        //     this.setState({loading:false,orders:response.data})
        // }).catch((err)=>{
        //     this.setState({loading:false})
        // })
    }
    render() {
        let orders =<Spinner/>;
        if(!this.props.loading){
            orders =
            this.props.orders.map(order =>
                (<Order
                    ingredients={order.ingredients}
                    price={order.price}
                    key={order['_id']} />)
            )        
        }

        return (
            <div>
                 {orders}
            </div>
           
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading:state.order.loading,
        userToken:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (token,userId) => { dispatch(actions.fetchOrders(token,userId)) }
    }
}

//export default Orders;
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHanlder(Orders, axios));