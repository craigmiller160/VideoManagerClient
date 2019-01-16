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

const tempCategories = [ // TODO replace with real categories
    { label: 'Cat 1', value: 'cat1' },
    { label: 'Cat 2', value: 'cat2' },
    { label: 'Cat 3', value: 'cat3' }
];

const tempSeries = [ // TODO replace with real data
    { label: 'Series 1', value: 'series1' },
    { label: 'Series 2', value: 'series2' },
    { label: 'Series 3', value: 'series3' }
];

const tempStars = [
    { label: 'Star 1', value: 'star1' },
    { label: 'Star 2', value: 'star2' },
    { label: 'Star 3', value: 'star3' }
];

class VideoSearch extends Component {

    componentDidMount() {

    }

    render() {
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
                            options={ tempCategories }
                            name={ CATEGORY_INPUT }
                        />
                    </Col>
                    <Col sm="6" md="3">
                        <Select
                            label="Series"
                            options={ tempSeries }
                            name={ SERIES_INPUT }
                        />
                    </Col>
                    <Col sm="6" md="3">
                        <Select
                            label="Stars"
                            options={ tempStars }
                            name={ STARS_INPUT }
                        />
                    </Col>
                </Row>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadFilterOptions
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VideoSearch);