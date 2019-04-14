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
import { withRouter } from 'react-router';

/* eslint-disable */ // TODO delete this
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
        expandVideoFile,
        videoPlayerReset,
        history
    } = props;

    const leftColSize = 6;
    const rootClasses = [ classes.VideoListItem, (expanded ? classes.active : '') ].join(' ');
    const actualDisplayName = displayName ? displayName : fileName;

    const playVideoClick = async () => {
        try {
            await videoPlayerReset();
            window.open(`/play/${fileId}`, '_blank');
        }
        catch (ex) { // eslint-disable-line no-empty
        }
    };

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
                            <Button color="primary" onClick={ playVideoClick }>Play</Button>
                        </Col>
                    </Row>
                </Collapse>
            </ListGroupItem>
        </div>
    );
};

VideoListItem.propTypes = {
    videoFile: PropTypes.object.isRequired,
    expandVideoFile: PropTypes.func.isRequired,
    videoPlayerReset: PropTypes.func.isRequired,
    history: PropTypes.object
};

export default withRouter(VideoListItem);