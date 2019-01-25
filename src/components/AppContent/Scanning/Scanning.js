import React from 'react';
import { Col, Row } from 'reactstrap';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './Scanning.scss';

const Scanning = () => {
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

export default Scanning;