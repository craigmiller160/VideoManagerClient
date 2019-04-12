import React from 'react';
import PropTypes from 'prop-types';
import classes from './VideoListItem.scss';
import {
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Col,
    Row,
    Button,
    Collapse
} from 'reactstrap';
import { Link } from 'react-router-dom';

const VideoListItem = (props) => {
    const {
        videoFile: {
            fileId,
            fileName,
            displayName,
            description,
            categories,
            series,
            stars,
            expanded
        },
        // TODO remove this eslint-disable
        videoFile, // eslint-disable-line no-unused-vars
        expandVideoFile
    } = props;

    const leftColSize = 6;
    const rootClasses = [ classes.VideoListItem, (expanded ? classes.active : '') ].join(' ');
    const actualDisplayName = displayName ? displayName : fileName;

    return (
        <div className={ rootClasses } onClick={ () => expandVideoFile(fileId) }>
            <ListGroupItem>
                <Row>
                    <Col xs={ leftColSize }>
                        <ListGroupItemHeading
                            className={ classes.heading }
                        >
                            { actualDisplayName }
                        </ListGroupItemHeading>
                    </Col>
                    <Col>
                        <span className={ classes.label }>Series:</span>
                    </Col>
                    <Col className="text-center">
                        <span className={ classes.label }>Categories:</span>
                    </Col>
                    <Col className="text-right">
                        <span className={ classes.label }>Stars:</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={ leftColSize }>
                        <ListGroupItemText>
                            { description }
                        </ListGroupItemText>
                    </Col>
                    <Col>
                        <ListGroupItemText>
                            { series.map(s => s.seriesName ).join(', ') }
                        </ListGroupItemText>
                    </Col>
                    <Col className="text-center">
                        <ListGroupItemText>
                            { categories.map(cat => cat.categoryName).join(', ') }
                        </ListGroupItemText>
                    </Col>
                    <Col className="text-right">
                        <ListGroupItemText>
                            { stars.map(star => star.starName).join(', ') }
                        </ListGroupItemText>
                    </Col>
                </Row>
                <Collapse isOpen={ expanded }>
                    <Row>
                        <Col>
                            <ListGroupItemText>
                                <span className={ classes.heading }>File Name: </span>
                                { fileName }
                            </ListGroupItemText>
                        </Col>
                        <Col className="text-right">
                            <Link to="/edit">
                                <Button color="info">Edit</Button>
                            </Link>
                            <Button
                                color="primary">
                                Play
                            </Button>
                        </Col>
                    </Row>
                </Collapse>
            </ListGroupItem>
        </div>
    );
};

VideoListItem.propTypes = {
    videoFile: PropTypes.object.isRequired,
    expandVideoFile: PropTypes.func.isRequired
};

export default VideoListItem;