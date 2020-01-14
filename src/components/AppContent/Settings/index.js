/* eslint-disable */ // TODO delete this
import React, { useEffect, useState } from 'react';
import classes from './Settings.scss';
import FlexRow from '../../UI/Grid/FlexRow';
import { getSettings } from '../../../services/SettingsApiService';
import Spinner from '../../UI/Spinner/Spinner';
import SettingsForm from './SettingsForm';

const Settings = () => {
    const [state, setState] = useState({
        initialValues: {},
        loading: true
    });

    useEffect(() => {
        const loadData = async () => {
            const res = await getSettings();
            setState((prevState) => ({
                ...prevState,
                initialValues: res.data,
                loading: false
            }));
        };
        loadData();
    }, []);

    return (
        <div className={ classes.Settings }>
            <FlexRow>
                <div className={ classes.title }>
                    <h3>Settings</h3>
                </div>
            </FlexRow>
            {
                state.loading &&
                    <Spinner />
            }
            {
                !state.loading &&
                    <SettingsForm />
            }
        </div>
    );
};

export default Settings;
