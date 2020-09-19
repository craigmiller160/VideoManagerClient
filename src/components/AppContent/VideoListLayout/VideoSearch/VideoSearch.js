/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React  from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { reset as resetForm } from 'redux-form';
import { Row, Col, Button } from 'reactstrap';
import Input from '../../../UI/form/Input/Input';
import Select from '../../../UI/form/Select/Select';
import classes from './VideoSearch.scss';
import Form from "../../../UI/form/Form/Form";
import { searchForVideos, setCurrentPage } from 'store/videoList/videoList.actions';
import { SORT_BY_OPTIONS, SORT_DIR_OPTIONS } from './VideoSearch.options';

export const FORM_NAME = 'video-search';

const VideoSearch = () => {
    const dispatch = useDispatch();
    const { categories, series, stars } = useSelector((state) => state.videoSearch.filters, shallowEqual);

    const doResetForm = () => {
        dispatch(resetForm(FORM_NAME));
        dispatch(searchForVideos());
    };

    const doSearch = () => {
        dispatch(setCurrentPage(0));
        dispatch(searchForVideos());
    };

    const initialValues = {
        sortBy: SORT_BY_OPTIONS[0],
        sortDir: SORT_DIR_OPTIONS[0]
    };

    // TODO sort by and direction should always require a value

    return (
        <Form
            form={ FORM_NAME }
            onSubmit={ doSearch }
            className={ classes.VideoSearch }
            destroyOnUnmount={ false }
            initialValues={ initialValues }
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
                    <Col sm="6" md={ { size: 4, offset: 2 } } className="text-center">
                        <Select
                            label="Sort By"
                            name="sortBy"
                            options={ SORT_BY_OPTIONS }
                        />
                    </Col>
                    <Col sm="6" md="4" className="text-center">
                        <Select
                            label="Sort Direction"
                            name="sortDir"
                            options={ SORT_DIR_OPTIONS }
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

export default VideoSearch;