import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, withRouter,Redirect } from 'react-router-dom';
//import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import LogOut from "./containers/Auth/Logout/Logout";
import React, { Component,Suspense } from 'react';
import { connect } from 'react-redux';
import * as actions from "./store/actions/index";
// const Checkout = React.lazy(()=>import('./containers/Checkout/Checkout'));
const AsyncOrders = React.lazy(()=>import('./containers/Orders/Orders'));
class App extends Component {
  componentDidMount() {
    this.props.authCheckState();
  }
  render() {

    let routes = (
      <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/"/>
      </Switch>
    );
    if (this.props.isUserAuthenticated) {
      routes = (
        <Switch>
        {/* <Route path="/orders" component={Orders} /> */}
        <Route path="/orders" render={()=><Suspense fallback={<div>Loading...</div>}><AsyncOrders/></Suspense>} /> 
        <Route path="/checkout" component={Checkout} />
        {/* <Route path="/checkout" render={()=><Suspense fallback={<div>Loading...</div>}><Checkout/></Suspense>} /> */}

        <Route path="/logout" component={LogOut} />
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
      );
    }
    return (
      <div>
        <Layout>
        {routes}
        </Layout>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    authCheckState: () => {
      dispatch(actions.authCheckState())
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    isUserAuthenticated: state.auth.token ? true : false
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
