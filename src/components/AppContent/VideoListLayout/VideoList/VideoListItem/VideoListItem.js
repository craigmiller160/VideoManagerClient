import React from 'react';
import classes from './VideoListItem.scss';
import { Row, Col } from 'reactstrap';

const VideoListItem = (props) => {
    const displayName = 'MyDisplayName';
    const fileName = 'MyFileName';
    const series = 'MySeries';
    const categories = 'Category 1, Category 2';
    const stars = 'Star 1, Star 2';
    const description = 'The description of the video file';

    return (
        <div className={ classes.VideoListItem }>
            <Row>
                <Col>
                    <p>{ displayName }</p>
                </Col>
                <Col>
                    <p>{ categories }</p>
                </Col>
                <Col>
                    <p>{ description }</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>{ series }</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>{ fileName }</p>
                </Col>
                <Col>
                    <p>{ stars }</p>
                </Col>
                <Col>
                    <button>Edit</button>
                    <button>Play</button>
                </Col>
            </Row>
        </div>
    );
};

export default VideoListItem;