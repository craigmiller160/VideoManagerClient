import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'components/UI/form/Form/Form';
import classes from './VideoFileEdit.scss';
import { Col, Row, Button } from 'reactstrap';
import Input from 'components/UI/form/Input/Input';
import Select from 'components/UI/form/Select/Select';
import { Prompt } from 'react-router';

export const FORM_NAME = 'video-file-edit';

const VideoFileEdit = (props) => {
    const [ isSubmitted, setSubmitted ] = useState(false);

    if (!props.selectedVideo) {
        return <div />;
    }

    const {
        selectedVideo,
        selectedVideo: { fileName },
        filters: { categories, stars, series },
        saveFileChanges
    } = props;

    const submit = () => {
        setSubmitted(true);
        saveFileChanges();
    };

    return (
        <>
            <Prompt
                when={ !isSubmitted }
                message="Are you sure you don't want to save your changes?"
            />
            <Form
                form={ FORM_NAME }
                handleSubmit={ submit }
                className={ classes.VideoFileEdit }
                initialValues={ selectedVideo }
            >
                <>
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
                    <Row className="align-items-center">
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
                    <Row className="justify-content-center" >
                        <Col md="4" className={ classes['add-filter-wrapper'] }>
                            <Button
                                color="info"
                            >
                                +
                            </Button>
                        </Col>
                        <Col md="4" className={ classes['add-filter-wrapper'] }>
                            <Button
                                color="info"
                            >
                                +
                            </Button>
                        </Col>
                        <Col md="4" className={ classes['add-filter-wrapper'] }>
                            <Button
                                color="info"
                            >
                                +
                            </Button>
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
                    <Row>
                        <Col className="text-center">
                            <Button
                                color="success"
                                type="submit"
                            >
                                Save
                            </Button>
                        </Col>
                    </Row>
                </>
            </Form>
        </>
    );
};

VideoFileEdit.propTypes = {
    selectedVideo: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    saveFileChanges: PropTypes.func.isRequired
};

export default VideoFileEdit;