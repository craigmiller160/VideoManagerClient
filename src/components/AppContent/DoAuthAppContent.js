import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../store/auth/auth.actions';

const DoAuthAppContent = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkAuth()); // TODO need some way to check initial auth value
    }, []);
};

export default DoAuthAppContent;