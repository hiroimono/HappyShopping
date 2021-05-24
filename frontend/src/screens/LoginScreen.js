import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

// actions
import { userLogin, userLogout } from '../actions/userActions';

// bootstrap
import { Button } from 'react-bootstrap';

const LoginScreen = () => {
    const dispatch = useDispatch();
    let data = { email: 'abuziddin@example.com', password: '123456' };
    useEffect(() => {
        // dispatch(userLogin(data));
    }, [dispatch]);

    const login = () => {
        dispatch(userLogin(data))
    }

    const logout = () => {
        dispatch(userLogout(data))
    }

    return (
        <>
            <Button onClick={login}>
                Login
            </Button>

            <Button onClick={logout}>
                Logout
            </Button>
        </>
    )
}

export default LoginScreen;