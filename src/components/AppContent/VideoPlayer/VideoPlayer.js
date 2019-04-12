/* eslint-disable */ // TODO delete this
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import classes from './VideoPlayer.scss';
import Spinner from '../../UI/Spinner/Spinner';

const VideoPlayer = (props) => {
    const [ loading, setLoading ] = useState(true);

    return (
        <div className={ classes.VideoPlayer }>
            {
                loading &&
                <Row>
                    <Col className="text-center">
                        <Spinner />
                    </Col>
                </Row>
            }
            {
                !loading &&
                <Row>
                    <Col className="text-center">
                        <h3 className={ classes.title }></h3>
                    </Col>
                </Row>
            }
        </div>
    );
};

export default VideoPlayer;