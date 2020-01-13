/* eslint-disable */ // TODO delete this
import React, { useEffect } from 'react';
import classes from './Settings.scss';
import FlexRow from '../../UI/Grid/FlexRow';

const Settings = () => {
    return (
        <div className={ classes.Settings }>
            <FlexRow>
                <div className={ classes.title }>
                    <h3>Settings</h3>
                </div>
            </FlexRow>
        </div>
    );
};

export default Settings;
