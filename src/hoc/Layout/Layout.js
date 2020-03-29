import React ,{useState}from "react";
import {connect} from "react-redux";
import Auxilary from "../Auxilary/Auxilary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
const Layout = props =>{
    const [showSideDrawer,setSideDrawer] = useState(false);
    const sideDrawerClosedHandler = () => {
        setSideDrawer(false);
    }
    const drawerToggleClickHandler = () => {
        setSideDrawer(!showSideDrawer);

    }
        return (
            <Auxilary>
                <Toolbar 
                isAuth={props.isUserAuthenticated}
                drawerToggleClicked={drawerToggleClickHandler} />
                <SideDrawer open={showSideDrawer} 
                            isAuth={props.isUserAuthenticated}
                closed={sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Auxilary>
        )
    
}
const mapStateToProps = (state) => {
    return {
        isUserAuthenticated:state.auth.token?true:false
    }
}

export default connect(mapStateToProps,null)(Layout);