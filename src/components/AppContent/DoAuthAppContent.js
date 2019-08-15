import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../store/auth/auth.actions';
import Spinner from '../UI/Spinner/Spinner';
import { AppContent } from './AppContent';

const DoAuthAppContent = () => {
    const dispatch = useDispatch();
    const [isChecking, setIsChecking] = useState(true);
    useEffect(() => {
        (async () => {
            await dispatch(checkAuth());
            setIsChecking(false);
        })();
    }, []);

    if (isChecking) {
        return <Spinner />
    }

    return <AppContent />;
};

export default DoAuthAppContent;