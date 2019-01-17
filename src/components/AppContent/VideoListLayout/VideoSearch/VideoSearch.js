import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Input from '../../../UI/form/Input/Input';
import Select from '../../../UI/form/Select/Select';
import classes from './VideoSearch.scss';
import Form from "../../../UI/form/Form/Form";
import { loadFilterOptions } from "../../../../store/videoSearch/videoSearch.actions";

const SEARCH_INPUT = 'searchInput';
const CATEGORY_INPUT = 'categoryInput';
const STARS_INPUT = 'starsInput';
const SERIES_INPUT = 'seriesInput';

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
            <Form form="video-search">
                <Row className={classes.VideoSearch}>
                    <Col sm="6" md="3">
                        <Input
                            label="Search"
                            name={ SEARCH_INPUT }
                        />
                    </Col>
                    <Col sm="6" md="3">
                        <Select
                            label="Category"
                            options={ categories }
                            name={ CATEGORY_INPUT }
                        />
                    </Col>
                    <Col sm="6" md="3">
                        <Select
                            label="Series"
                            options={ series }
                            name={ SERIES_INPUT }
                        />
                    </Col>
                    <Col sm="6" md="3">
                        <Select
                            label="Stars"
                            options={ stars }
                            name={ STARS_INPUT }
                        />
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
    loadFilterOptions
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VideoSearch);