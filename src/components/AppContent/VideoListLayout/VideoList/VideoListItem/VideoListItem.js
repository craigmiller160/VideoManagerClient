import React from 'react';
import PropTypes from 'prop-types';
import classes from './VideoListItem.scss';
import {
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Row,
    Button,
    Collapse
} from 'reactstrap';
import { Link } from 'react-router-dom';
import VideoDate from 'model/VideoDate';
import WordWrapCol from 'components/UI/WordWrapCol/WordWrapCol';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { reset as videoPlayerReset } from 'store/videoPlayer/videoPlayer.actions';
import { expandVideoFile } from '../../../../../store/videoList/videoList.actions';
import { ROLE_EDIT } from '../../../../../utils/securityConstants';

const VideoListItem = (props) => {
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.auth.userDetails, shallowEqual);
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
            lastViewed,
            fileAdded
        }
    } = props;

    const hasEditRole = !!userDetails?.roles?.find((role) => role.name === ROLE_EDIT);

    const leftColSize = 6;
    const rootClasses = [ classes.VideoListItem, (expanded ? classes.active : '') ].join(' ');
    const actualDisplayName = displayName ? displayName : fileName;
    const formattedLastViewed = lastViewed ? new VideoDate(lastViewed).formatDateTime() : '';
    const formattedFileAdded = fileAdded ? new VideoDate(fileAdded).formatDateTime() : '';

    const playVideoClick = async () => {
        await dispatch(videoPlayerReset());
        window.open(`/play/${fileId}`, '_blank');
    };

    return (
        <div className={ rootClasses } onClick={ () => dispatch(expandVideoFile(fileId)) }>
            <ListGroupItem>
                <Row>
                    <WordWrapCol xs={ leftColSize }>
                        <ListGroupItemHeading
                            className={ classes.heading }
                        >
                            { actualDisplayName }
                        </ListGroupItemHeading>
                    </WordWrapCol>
                    <WordWrapCol>
                        <span className={ classes.label }>Series:</span>
                    </WordWrapCol>
                    <WordWrapCol className="text-center">
                        <span className={ classes.label }>Categories:</span>
                    </WordWrapCol>
                    <WordWrapCol className="text-right">
                        <span className={ classes.label }>Stars:</span>
                    </WordWrapCol>
                </Row>
                <Row>
                    <WordWrapCol xs={ leftColSize }>
                        <ListGroupItemText>
                            { description }
                        </ListGroupItemText>
                    </WordWrapCol>
                    <WordWrapCol>
                        <ListGroupItemText>
                            { series.map(s => s.seriesName ).join(', ') }
                        </ListGroupItemText>
                    </WordWrapCol>
                    <WordWrapCol className="text-center">
                        <ListGroupItemText>
                            { categories.map(cat => cat.categoryName).join(', ') }
                        </ListGroupItemText>
                    </WordWrapCol>
                    <WordWrapCol className="text-right">
                        <ListGroupItemText>
                            { stars.map(star => star.starName).join(', ') }
                        </ListGroupItemText>
                    </WordWrapCol>
                </Row>
                <Collapse isOpen={ expanded }>
                    <Row>
                        <WordWrapCol xs={ leftColSize }>
                            <p className={ classes.heading }>File Name:</p>
                            <p>{ fileName }</p>
                        </WordWrapCol>
                        <WordWrapCol>
                            <p className={ classes.label }>Views:</p>
                            <p className={ classes['push-text'] }>{ viewCount }</p>
                        </WordWrapCol>
                        <WordWrapCol className="text-center">
                            <p className={ classes.label }>Last Viewed:</p>
                            <p>{ formattedLastViewed }</p>
                        </WordWrapCol>
                        <WordWrapCol className="text-right">
                            <p className={ classes.label }>File Added:</p>
                            <p>{ formattedFileAdded }</p>
                        </WordWrapCol>
                    </Row>
                    <Row>
                        <WordWrapCol className="text-right">
                            {
                                hasEditRole &&
                                <Link to="/edit">
                                    <Button color="info">Edit</Button>
                                </Link>
                            }
                            <Button color="primary" onClick={ playVideoClick }>Play</Button>
                        </WordWrapCol>
                    </Row>
                </Collapse>
            </ListGroupItem>
        </div>
    );
};

VideoListItem.propTypes = {
    videoFile: PropTypes.object.isRequired
};

export default VideoListItem;
