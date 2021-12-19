import React from 'react'
import {Route,Navigate} from 'react-router-dom';
import{isLoaded,isEmpty} from 'react-redux-firebase'
import { connect } from 'react-redux';

function PrivateRoute({auth,children, redirectTo}) {
    return isLoaded(auth) && !isEmpty(auth) ? children: <Navigate to={redirectTo} />

}

const mapStateToProps = (state) => {
    return {
        auth : state.firebase.auth
    }
}

export default connect(mapStateToProps)(PrivateRoute)
