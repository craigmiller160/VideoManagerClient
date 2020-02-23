import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'components/UI/Modal/Modal';
import Input from 'components/UI/form/Input/Input';
import { EDIT_ACTION } from 'store/filterInputModal/filterInputModal.constants';
import { deleteFilter, hideFilterModal, saveFilterChanges } from 'store/filterInputModal/filterInputModal.actions';

const FORM_NAME = 'filterInputForm';

export const FilterInputModal = (props) => {
    const {
        open,
        close,
        submit,
        type,
        action,
        value,
        deleteFilter
    } = props;

    const modalBtns = [
        {
            color: 'success',
            text: 'Save',
            type: 'submit',
            closeModal: true
        },
        {
            color: 'info',
            text: 'Cancel',
            closeModal: true
        }
    ];

    if (EDIT_ACTION === action) {
        modalBtns.unshift({
            color: 'danger',
            text: 'Delete',
            closeModal: true,
            onClick: deleteFilter
        });
    }

    const initialValues = EDIT_ACTION === action ? {
        name: value.label,
        id: value.value
    } : {};

    return (
        <Modal
            id={ `${type.toLowerCase() || 'empty'}-filter-input-modal` }
            open={ open }
            close={ close }
            title={ `${action} ${type}` }
            modalBtns={ modalBtns }
            form={ {
                name: FORM_NAME,
                handleSubmit: submit,
                initialValues
            } }
        >
            <Input
                id={ "filter-name" }
                label={ `${type} Name` }
                name="name"
            />
            <Input
                type="hidden"
                name="id"
            />
        </Modal>
    );
};

FilterInputModal.defaultProps = {
    value: {}
};

FilterInputModal.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
    submit: PropTypes.func,
    deleteFilter: PropTypes.func,
    type: PropTypes.string,
    action: PropTypes.string,
    value: PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.string
    })
};

const mapStateToProps = (state) => ({
    open: state.filterInputModal.open,
    type: state.filterInputModal.type,
    action: state.filterInputModal.action
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    close: () => hideFilterModal(),
    submit: saveFilterChanges,
    deleteFilter
}, dispatch);

const FilterInputModalConnected = connect(mapStateToProps, mapDispatchToProps)(FilterInputModal);
FilterInputModalConnected.propTypes = {};

export default FilterInputModalConnected;