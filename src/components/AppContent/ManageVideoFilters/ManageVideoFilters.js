import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import classes from './ManageVideoFilters.scss';
import FilterInputModal from 'components/Modals/FilterInputModal/FilterInputModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    showAddCategoryModal,
    showAddSeriesModal,
    showAddStarModal,
    showEditCategoryModal,
    showEditSeriesModal,
    showEditStarModal
} from 'store/filterInputModal/filterInputModal.actions';
import { getSelectedFilter } from 'store/filterInputModal/filterInputModal.selectors';
import FilterListItems from './FilterListItems/FilterListItems';
import AddButton from '../../UI/AddButton/AddButton';

const ManageVideoFilters = (props) => {
    const {
        filters: { categories, stars, series },
        showAddCategoryModal,
        showAddSeriesModal,
        showAddStarModal,
        showEditCategoryModal,
        showEditSeriesModal,
        showEditStarModal,
        selectedFilter
    } = props;

    return (
        <>
            <Row className={ classes.ManageVideoFilters }>
                <Col>
                    <Row>
                        <Col className="text-center">
                            <div className={ classes.title }>
                                <h3 id="manage-filters-title">Manage Filters</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col id="category-filters">
                            <Row>
                                <Col>
                                    <h4 id="category-filters-title" className="text-center">Categories</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col id="category-filters-list" className={ classes.scroll }>
                                    <FilterListItems
                                        type="category"
                                        items={ categories }
                                        showEditModal={ showEditCategoryModal }
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <AddButton id="category-filters-add-btn" addItem={ showAddCategoryModal } />
                                </Col>
                            </Row>
                        </Col>
                        <Col id="series-filters">
                            <Row>
                                <Col>
                                    <h4 id="series-filters-title" className="text-center">Series</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col id="series-filters-list" className={ classes.scroll }>
                                    <FilterListItems
                                        type="series"
                                        items={ series }
                                        showEditModal={ showEditSeriesModal }
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <AddButton id="series-filters-add-btn" addItem={ showAddSeriesModal } />
                                </Col>
                            </Row>
                        </Col>
                        <Col id="star-filters">
                            <Row>
                                <Col>
                                    <h4 id="star-filters-title" className="text-center">Stars</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col id="star-filters-list" className={ classes.scroll }>
                                    <FilterListItems
                                        type="star"
                                        items={ stars }
                                        showEditModal={ showEditStarModal }
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <AddButton id="star-filters-add-btn" addItem={ showAddStarModal } />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <FilterInputModal
                value={ selectedFilter }
            />
        </>
    );
};

ManageVideoFilters.propTypes = {
    filters: PropTypes.shape({
        categories: PropTypes.array,
        series: PropTypes.array,
        stars: PropTypes.array
    }),
    selectedFilter: PropTypes.object,
    showAddCategoryModal: PropTypes.func,
    showAddSeriesModal: PropTypes.func,
    showAddStarModal: PropTypes.func,
    showEditCategoryModal: PropTypes.func,
    showEditSeriesModal: PropTypes.func,
    showEditStarModal: PropTypes.func
};

const mapStateToProps = (state) => ({
    filters: state.videoSearch.filters,
    selectedFilter: getSelectedFilter(state)
});

// Actions are mapped this way because SyntheticEvents were being passed into them which caused console errors
const mapDispatchToProps = (dispatch) => bindActionCreators({
    showAddCategoryModal: () => showAddCategoryModal(),
    showAddSeriesModal: () => showAddSeriesModal(),
    showAddStarModal: () => showAddStarModal(),
    showEditCategoryModal,
    showEditSeriesModal,
    showEditStarModal
}, dispatch);

const ManageVideoFiltersConnected = connect(mapStateToProps, mapDispatchToProps)(ManageVideoFilters);
ManageVideoFiltersConnected.propTypes = {};
export default ManageVideoFiltersConnected;