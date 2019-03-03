import React from 'react';
import Modal from 'components/UI/Modal/Modal';
import PropTypes from 'prop-types';
import Input from 'components/UI/form/Input/Input';

const FORM_NAME = 'filterInputForm';

const FilterInputModal = (props) => {
    const {
        open,
        close,
        submit,
        type,
        action
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

    // TODO in the long run, this is how we pass in the ID for editing existing entries
    const initialValues = {};

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

FilterInputModal.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
    submit: PropTypes.func,
    type: PropTypes.string,
    action: PropTypes.string,
    value: PropTypes.string
};

export default FilterInputModal;