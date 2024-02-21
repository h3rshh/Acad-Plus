import React from 'react'
import {Navigate} from 'react-router-dom'

const PrivateRoute = ({loggedIn , children}) => {

    if(loggedIn){
        return children; //Return dashboard , which is the child of Privateroute
    }

    else{
        return <Navigate to="/login" />
    }
}

export default PrivateRoute
