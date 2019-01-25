import React from 'react';
import { Row, Col } from 'reactstrap';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './Scanning.scss';

const Scanning = (props) => (
    <div className={ classes.Scanning }>
        <Row>
            <Col xs="12">
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

export default Scanning;