import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'reactstrap';
import classes from './ManageVideoFilters.scss';

const ListElement = ({ value, label }) => (
    <p key={ value } className={ classes['list-item'] } >{ label }</p>
);

export const ManageVideoFilters = (props) => {
    const {
        filters: { categories, stars, series }
    } = props;

    return (
        <Row className={ classes.ManageVideoFilters }>
            <Col>
                <Row>
                    <Col className="text-center">
                        <h3 className={ classes.title }>Manage Filters</h3>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Row>
                            <Col>
                                <h4 className="text-center">Categories</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={ classes.scroll }>
                                {
                                    categories.map(ListElement)
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <Button color="info">+</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <h4 className="text-center">Series</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={ classes.scroll }>
                                {
                                    series.map(ListElement)
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <Button color="info">+</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <h4 className="text-center">Stars</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={ classes.scroll }>
                                {
                                    stars.map(ListElement)
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <Button color="info">+</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

ManageVideoFilters.propTypes = {
    filters: PropTypes.shape({
        categories: PropTypes.array,
        stars: PropTypes.array,
        series: PropTypes.array
    }).isRequired
};

export default ManageVideoFilters;