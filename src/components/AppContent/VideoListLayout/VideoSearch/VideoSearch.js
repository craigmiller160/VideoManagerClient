import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { Row, Col, Button } from 'reactstrap';
import Input from '../../../UI/form/Input/Input';
import Select from '../../../UI/form/Select/Select';
import classes from './VideoSearch.scss';
import Form from "../../../UI/form/Form/Form";
import { loadFilterOptions } from "../../../../store/videoSearch/videoSearch.actions";
import { searchForVideos } from '../../../../store/videoList/videoList.actions';

const FORM_NAME = 'video-search';

class VideoSearch extends Component {

    componentDidMount() {
        this.props.loadFilterOptions();
    }

    resetForm = () => {
        reset(FORM_NAME); // TODO needs to be tested to make sure it works
    };

    render() {
        const {
            categories,
            series,
            stars
        } = this.props.filters;

        return (
            <Form
                form={ FORM_NAME }
                handleSubmit={ this.props.searchForVideos }
                className={ classes.VideoSearch }
            >
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
                            type="submit"
                            color="primary"
                        >
                            Search
                        </Button>
                        <Button
                            type="button"
                            color="info"
                            onClick={ this.resetForm }
                        >
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.videoSearch.filters
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadFilterOptions,
    searchForVideos
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VideoSearch);