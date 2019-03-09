import React from 'react';
import Modal from 'components/UI/Modal/Modal';
import PropTypes from 'prop-types';
import Input from 'components/UI/form/Input/Input';
import { EDIT_ACTION } from '../../../store/filterInputModal/filterInputModal.reducer';

const FORM_NAME = 'filterInputForm';

const FilterInputModal = (props) => {
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

export default FilterInputModal;