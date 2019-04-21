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
import VideoDate from 'model/VideoDate';

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
            expanded,
            viewCount,
            lastViewed
        },
        expandVideoFile,
        videoPlayerReset
    } = props;

    const leftColSize = 6;
    const rootClasses = [ classes.VideoListItem, (expanded ? classes.active : '') ].join(' ');
    const actualDisplayName = displayName ? displayName : fileName;
    const formattedLastViewed = new VideoDate(lastViewed).formatDateTime();

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
                        <Col xs={ leftColSize }>
                            <ListGroupItemText>
                                <span className={ classes.heading }>File Name: </span>
                                { fileName }
                            </ListGroupItemText>
                        </Col>
                        <Col>
                            <p className={ classes.label }>Views:</p>
                            <p>{ viewCount }</p>
                        </Col>
                        <Col className="text-center">
                            <p className={ classes.label }>Last Viewed:</p>
                            <p>{ formattedLastViewed }</p>
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
    videoPlayerReset: PropTypes.func.isRequired
};

export default VideoListItem;