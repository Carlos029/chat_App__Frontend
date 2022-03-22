import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRouter = ({ children, isAuthenticated }) => {
    return (

        !isAuthenticated
            ?
            children
            :
            <Navigate to='/' />
    )
}
