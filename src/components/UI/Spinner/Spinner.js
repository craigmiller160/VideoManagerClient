import React from 'react';
import classes from './Spinner.scss';
import { Spinner as ReactSpinner } from 'reactstrap';

const Spinner = () => (
    <div className={ classes.SpinnerContainer }>
        <ReactSpinner
            className={ classes.Spinner }
            color="primary"
        />
    </div>
);

export default Spinner;