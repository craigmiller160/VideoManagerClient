import React from 'react';
import PropTypes from 'prop-types';
import classes from './VideoListItem.scss';
import {
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Col,
    Row,
    Button
} from 'reactstrap';

const VideoListItem = (props) => {
    const {
        fileName,
        displayName,
        description,
        categories,
        series,
        stars
    } = props.videoFile;

    const leftColSize = 4;

    return (
        <div className={ classes.VideoListItem }>
            <ListGroupItem>
                <Row>
                    <Col xs={ leftColSize }>
                        <ListGroupItemHeading
                            className={ classes.heading }
                        >
                            { displayName }
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
                {/*<Row>*/}
                    {/*<Col>*/}
                        {/*<ListGroupItemText>*/}
                            {/*{ fileName }*/}
                        {/*</ListGroupItemText>*/}
                    {/*</Col>*/}
                    {/*<Col className="text-right">*/}
                        {/*<Button color="info">Edit</Button>*/}
                        {/*<Button color="primary">Play</Button>*/}
                    {/*</Col>*/}
                {/*</Row>*/}
            </ListGroupItem>
        </div>
    );
};

VideoListItem.propTypes = {
    videoFile: PropTypes.object.isRequired
};

export default VideoListItem;