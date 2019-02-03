import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'components/UI/form/Form/Form';
import classes from './VideoFileEdit.scss';
import { Col, Row } from 'reactstrap';
import Input from 'components/UI/form/Input/Input';

export const FORM_NAME = 'video-file-edit';

// TODO need some way to warn that unsaved changes will be lost when leaving this component

export class VideoFileEdit extends Component {

    handleSubmit = () => {
        console.log('Submitting'); // TODO delete this
    };

    render() {
        if (!this.props.selectedVideo) {
            return <div />;
        }

        const {
            selectedVideo,
            selectedVideo: { fileName },
            filters: { categories, stars, series }
        } = this.props;

        return (
            <Form
                form={ FORM_NAME }
                handleSubmit={ this.handleSubmit }
                className={ classes.VideoFileEdit }
                initialValues={ selectedVideo }
            >
                <Row>
                    <Col className="text-center" md={ { size: 8, offset: 2 } }>
                        <h3>{ fileName }</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={ { size: 4, offset: 2 } }>
                        <Input
                            label="Display Name"
                            name="displayName"
                        />
                    </Col>
                    <Col md={ { size: 4 } }>

                    </Col>
                </Row>
            </Form>
        );
    }
}

VideoFileEdit.propTypes = {
    selectedVideo: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired
};

export default VideoFileEdit;