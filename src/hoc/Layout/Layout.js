import React from "react";
import {connect} from "react-redux";
import Auxilary from "../Auxilary/Auxilary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends React.Component {

    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }
    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        }
        )
    }
    render() {
        return (
            <Auxilary>
                <Toolbar 
                isAuth={this.props.isUserAuthenticated}
                drawerToggleClicked={this.drawerToggleClickHandler} />
                <SideDrawer open={this.state.showSideDrawer} 
                            isAuth={this.props.isUserAuthenticated}
                closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxilary>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isUserAuthenticated:state.auth.token?true:false
    }
}

export default connect(mapStateToProps,null)(Layout);