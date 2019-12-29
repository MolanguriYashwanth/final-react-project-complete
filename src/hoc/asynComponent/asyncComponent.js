import React, {Component,Suspense } from 'react';
import { Route } from 'react-router-dom';

const CheckOut = React.lazy(()=>import('../../containers/Checkout/Checkout'));

class asyncComponent extends Component {
    render() {
        return (
            <Route path="/posts" render={()=><Suspense fallback={<div>Loading...</div>}><CheckOut/></Suspense>} />
        );
    }
}

export default asyncComponent;