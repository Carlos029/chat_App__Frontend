import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { ChatScreen } from '../components/chat/ChatScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';


export const AppRouter = () => {

    const dispatch = useDispatch()
    const {checking, uid} = useSelector(state => state.auth) 
    

    useEffect(() => {

        dispatch(startChecking()) // checks if the user has a JWT

    }, [dispatch])

    if (checking) {
        return (
            <div className="loading">
            <div className="loading__text">Loading</div>
            <div className='loading_dots'>
              <span className="loading__dot" style={{'--i': 1}}></span>
              <span className="loading__dot" style={{'--i': 2}}></span>
              <span className="loading__dot" style={{'--i': 3}}></span>
            </div>
          </div>
        )
    }


    return (

        <Router>
            <Routes>


                <Route path="/auth/*" element={
                    <PublicRouter isAuthenticated={uid}>
                        <AuthRouter/>
                    </PublicRouter>
                } />

                <Route path="/" element={
                    <PrivateRouter isAuthenticated={uid}>
                        <ChatScreen />
                    </PrivateRouter>
                } />


                <Route path="/*" element={<Navigate to='/auth/login' />} />


            </Routes>
        </Router>

    )
}
