import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import Input from '../../../UI/form/Input/Input';
import Select from '../../../UI/form/Select/Select';
import classes from './VideoSearch.scss';
import Form from "../../../UI/form/Form/Form";
import { loadFilterOptions } from "../../../../store/videoSearch/videoSearch.actions";
import { searchForVideos } from '../../../../store/videoList/videoList.actions';

class VideoSearch extends Component {

    componentDidMount() {
        this.props.loadFilterOptions();
    }

    render() {
        const {
            categories,
            series,
            stars
        } = this.props.filters;

        return (
            <Form
                form="video-search"
                handleSubmit={ this.props.searchForVideos }
            >
                <Row className={classes.VideoSearch}>
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
                        <Button type="submit" color="primary">Search</Button>
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