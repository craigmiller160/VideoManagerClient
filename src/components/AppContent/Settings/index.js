/* eslint-disable */ // TODO delete this
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import classes from './Settings.scss';
import FlexRow from '../../UI/Grid/FlexRow';
import Spinner from '../../UI/Spinner/Spinner';
import { loadSettings, saveSettings } from '../../../store/settings/settings.actions';
import Form from '../../UI/form/Form/Form';

export const FORM_NAME = 'Settings_Form';

const Settings = () => {
    const dispatch = useDispatch();
    const { loading, settingsValues } = useSelector((state) => state.settings, shallowEqual);

    useEffect(() => {
        dispatch(loadSettings());
    }, []);

    return (
        <div className={ classes.Settings }>
            <FlexRow>
                <div className={ classes.title }>
                    <h3>Settings</h3>
                </div>
            </FlexRow>
            {
                loading &&
                    <Spinner />
            }
            {
                !loading &&
                <Form
                    form={ FORM_NAME }
                    onSubmit={ (values) => dispatch(saveSettings(values)) }
                    initialValues={ settingsValues }
                    enableReinitialize
                >

                </Form>
            }
        </div>
    );
};

export default Settings;
