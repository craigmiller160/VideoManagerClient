import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Input from '../../../UI/Input/Input';
import classes from './VideoSearch.scss';

const SEARCH_INPUT = 'searchInput';
const CATEGORY_INPUT = 'categoryInput';
const STATUS_INPUT = 'statusInput';
const SERIES_INPUT = 'seriesInput';

class VideoSearch extends Component {

    state = { // TODO replace this with redux-form
        [SEARCH_INPUT]: 'abc',
        [CATEGORY_INPUT]: '',
        [STATUS_INPUT]: '',
        [SERIES_INPUT]: ''
    };

    onInputChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    render() {
        return (
            <Row className={classes.VideoSearch}>
                <Col sm="6" md="3">
                    <Input
                        label="Search"
                        name={ SEARCH_INPUT }
                        onChange={ this.onInputChange }
                        value={ this.state.search }
                    />
                </Col>
                <Col sm="6" md="3">
                    <p>Test</p>
                </Col>
                <Col sm="6" md="3">
                    <p>Test</p>
                </Col>
                <Col sm="6" md="3">
                    <p>Test</p>
                </Col>
            </Row>
        );
    }
}

export default VideoSearch;