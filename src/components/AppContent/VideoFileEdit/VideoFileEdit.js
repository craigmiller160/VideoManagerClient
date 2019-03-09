import React from 'react';
import PropTypes from 'prop-types';
import Form from 'components/UI/form/Form/Form';
import classes from './VideoFileEdit.scss';
import { Col, Row } from 'reactstrap';
import Input from 'components/UI/form/Input/Input';
import Select from 'components/UI/form/Select/Select';

export const FORM_NAME = 'video-file-edit';

// TODO need some way to warn that unsaved changes will be lost when leaving this component

const VideoFileEdit = (props) => {
    const handleSubmit = () => {
        // TODO this should call a redux action
        console.log('Submitting'); // TODO delete this
    };

    if (!props.selectedVideo) {
        return <div />;
    }

    const {
        selectedVideo,
        selectedVideo: { fileName },
        filters: { categories, stars, series }
    } = props;

    return (
        <Form
            form={ FORM_NAME }
            handleSubmit={ handleSubmit }
            className={ classes.VideoFileEdit }
            initialValues={ selectedVideo }
        >
            <Row>
                <Col className="text-center">
                    <h3 className={ classes.title }>{ fileName }</h3>
                </Col>
            </Row>
            <Row>
                <Col md={ { size: 4, offset: 4 } }>
                    <Input
                        label="Display Name"
                        name="displayName"
                    />
                </Col>
            </Row>
            <Row>
                <Col md="4">
                    <Select
                        label="Categories"
                        options={ categories }
                        name="categories"
                        multi
                    />
                </Col>
                <Col md="4">
                    <Select
                        label="Series"
                        options={ series }
                        name="series"
                        multi
                    />
                </Col>
                <Col md="4">
                    <Select
                        label="Stars"
                        options={ stars }
                        name="stars"
                        multi
                    />
                </Col>
            </Row>
            <Row>
                <Col md={ { size: 6, offset: 3 } }>
                    <Input
                        type="textarea"
                        name="description"
                        label="Description"
                        textarea={ {
                            rows: 5
                        } }
                    />
                </Col>
            </Row>
        </Form>
    );
};

VideoFileEdit.propTypes = {
    selectedVideo: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired
};

export default VideoFileEdit;