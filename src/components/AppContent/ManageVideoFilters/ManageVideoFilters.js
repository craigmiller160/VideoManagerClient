import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import classes from './ManageVideoFilters.scss';
import FilterInputModal from 'components/Modals/FilterInputModal/FilterInputModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    hideFilterModal,
    showAddCategoryModal,
    showAddSeriesModal,
    showAddStarModal, showEditCategoryModal, showEditSeriesModal, showEditStarModal
} from 'store/filterInputModal/filterInputModal.actions';
import { saveFilterChanges } from 'store/filterInputModal/filterInputModal.actions';
import FilterListItem from './FilterListItem/FilterListItem';

const ManageVideoFilters = (props) => {
    const {
        filters: { categories, stars, series },
        open, type, action,
        showAddCategoryModal,
        showAddSeriesModal,
        showAddStarModal,
        showEditCategoryModal,
        showEditSeriesModal,
        showEditStarModal,
        hideFilterModal,
        saveFilterChanges
    } = props;

    return (
        <>
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
                                        categories.map(({ value, label }) => (
                                            <FilterListItem
                                                key={ value }
                                                label={ label }
                                                value={ value }
                                                click={ showEditCategoryModal }
                                            />
                                        ))
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <Button
                                        color="info"
                                        onClick={ showAddCategoryModal }
                                    >
                                        +
                                    </Button>
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
                                        series.map(({ value, label }) => (
                                            <FilterListItem
                                                key={ value }
                                                label={ label }
                                                value={ value }
                                                click={ showEditSeriesModal }
                                            />
                                        ))
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <Button
                                        color="info"
                                        onClick={ showAddSeriesModal }
                                    >
                                        +
                                    </Button>
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
                                        stars.map(({ value, label }) => (
                                            <FilterListItem
                                                key={ value }
                                                label={ label }
                                                value={ value }
                                                click={ showEditStarModal }
                                            />
                                        ))
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <Button
                                        color="info"
                                        onClick={ showAddStarModal }
                                    >
                                        +
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <FilterInputModal
                open={ open }
                close={ hideFilterModal }
                type={ type }
                action={ action }
                submit={ saveFilterChanges }
            />
        </>
    );
};

const mapStateToProps = (state) => ({
    open: state.filterInputModal.open,
    type: state.filterInputModal.type,
    action: state.filterInputModal.action,
    filters: state.videoSearch.filters
});

// Actions are mapped this way because SyntheticEvents were being passed into them which caused console errors
const mapDispatchToProps = (dispatch) => bindActionCreators({
    showAddCategoryModal: () => showAddCategoryModal(),
    showAddSeriesModal: () => showAddSeriesModal(),
    showAddStarModal: () => showAddStarModal(),
    showEditCategoryModal,
    showEditSeriesModal,
    showEditStarModal,
    hideFilterModal: () => hideFilterModal(),
    saveFilterChanges
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManageVideoFilters);