import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import LogOut from "./containers/Auth/Logout/Logout";
import React, { Suspense } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from "./store/actions/index";
const AsyncCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));
const AsyncOrders = React.lazy(() => import('./containers/Orders/Orders'));
const AsyncAuth = React.lazy(() => import('./containers/Auth/Auth'));

const App = props => {
  const {authCheckState} = props;
  useEffect(() => {
    authCheckState()
  }, [authCheckState]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Suspense fallback={<div>Loading...</div>}><AsyncAuth {...props} /></Suspense>} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isUserAuthenticated) {
    routes = (
      <Switch>
        {/* <Route path="/orders" component={Orders} /> */}
        <Route path="/orders" render={(props) => <Suspense fallback={<div>Loading...</div>}><AsyncOrders {...props} /></Suspense>} />
        {/* <Route path="/checkout" component={Checkout} /> */}
        <Route path="/checkout" render={(props) => <Suspense fallback={<div>Loading...</div>}><AsyncCheckout {...props} /></Suspense>} />

        <Route path="/logout" component={LogOut} />
        <Route path="/auth" render={(props) => <Suspense fallback={<div>Loading...</div>}><AsyncAuth {...props} /></Suspense>} />
        {/* <Route path="/auth" component={Auth} /> */}
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
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
const mapDispatchToProps = (dispatch) => {
  return {
    authCheckState: () => {
      dispatch(actions.authCheckState())
    }
  }
}
const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.auth.token ? true : false
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
