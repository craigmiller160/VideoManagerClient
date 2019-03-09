import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './Scanning.scss';

let intervalId;

const Scanning = (props) => {
    useEffect(() => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        intervalId = setInterval(() => {
            props.checkIsScanning();
        }, 1000);

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);

    const colSize = {
        size: 8,
        offset: 2
    };

    return (
        <div className={ classes.Scanning }>
            <Row>
                <Col xs={ colSize }>
                    <h3>Scanning for videos, please wait. This may take a few minutes.</h3>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <Spinner />
                </Col>
            </Row>
        </div>
    );
};

Scanning.propTypes = {
    isScanning: PropTypes.bool.isRequired,
    checkIsScanning: PropTypes.func.isRequired
};

export default Scanning;