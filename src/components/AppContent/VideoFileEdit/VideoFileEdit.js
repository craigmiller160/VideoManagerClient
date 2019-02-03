import React, { Component } from 'react';
import Form from 'components/UI/form/Form/Form';
import classes from './VideoFileEdit.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { getSelectedVideo } from '../../../store/videoList/videoList.selectors';

export const FORM_NAME = 'video-file-edit';

export class VideoFileEdit extends Component {

    render() {

        return (
            <Form
                form={ FORM_NAME }
                handleSubmit={ () => null } // TODO finish this
                className={ classes.VideoFileEdit }
            >
                <Row>
                    <Col>

                    </Col>
                </Row>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedVideo: getSelectedVideo(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VideoFileEdit);