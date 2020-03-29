
import React from 'react';
import Modal from "../../components/UI/Modal/Modal";
import Auxilary from "../Auxilary/Auxilary";
import useHttpErrorHandler from '../../hooks/http-error-handler';
const WithErrorHandler = (WrappedComponent, axios) => {
    return function ErrorHandler(props) {
    const [error,errConfirmedHandler] = useHttpErrorHandler(axios);
        return (
            <Auxilary>
                <Modal show={error}
                    modalClosed={errConfirmedHandler}
                >
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Auxilary>
        )


    }
}
export default WithErrorHandler;