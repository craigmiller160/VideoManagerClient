import React  from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { Row, Col, Button } from 'reactstrap';
import Input from '../../../UI/form/Input/Input';
import Select from '../../../UI/form/Select/Select';
import classes from './VideoSearch.scss';
import Form from "../../../UI/form/Form/Form";
import { searchForVideos } from 'store/videoList/videoList.actions';

export const FORM_NAME = 'video-search';

export const VideoSearch = (props) => {
    const {
        filters: { categories, series, stars },
        searchForVideos,
        resetForm
    } = props;

    const doResetForm = () => {
        resetForm(FORM_NAME);
        searchForVideos();
    };

    return (
        <Form
            form={ FORM_NAME }
            handleSubmit={ searchForVideos }
            className={ classes.VideoSearch }
        >
            <>
                <Row>
                    <Col sm="6" md="3">
                        <Input
                            label="Search"
                            name="search"
                        />
                    </Col>
                    <Col sm="6" md="3">
                        <Select
                            label="Category"
                            options={ categories }
                            name="category"
                        />
                    </Col>
                    <Col sm="6" md="3">
                        <Select
                            label="Series"
                            options={ series }
                            name="series"
                        />
                    </Col>
                    <Col sm="6" md="3">
                        <Select
                            label="Stars"
                            options={ stars }
                            name="star"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <Button
                            id="do-video-search-btn"
                            type="submit"
                            color="primary"
                        >
                            Search
                        </Button>
                        <Button
                            id="reset-video-search-btn"
                            type="button"
                            color="info"
                            onClick={ doResetForm }
                        >
                            Reset
                        </Button>
                    </Col>
                </Row>
            </>
        </Form>
    );
};

VideoSearch.propTypes = {
    filters: PropTypes.shape({
        categories: PropTypes.array,
        series: PropTypes.array,
        stars: PropTypes.array
    }),
    searchForVideos: PropTypes.func,
    resetForm: PropTypes.func
};

const mapStateToProps = (state) => ({
    filters: state.videoSearch.filters
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    searchForVideos,
    resetForm: reset
}, dispatch);

const VideoSearchConnected = connect(mapStateToProps, mapDispatchToProps)(VideoSearch);
VideoSearchConnected.propTypes = {};
export default VideoSearchConnected;