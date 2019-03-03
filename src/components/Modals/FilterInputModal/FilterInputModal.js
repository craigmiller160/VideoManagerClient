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
        action,
        value
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

    return (
        <Modal
            open={ open }
            close={ close }
            title={ `${action} ${type}` }
            modalBtns={ modalBtns }
            form={ {
                name: FORM_NAME,
                handleSubmit: submit,
                initialValues: {
                    name: value.label,
                    id: value.value
                }
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
    type: PropTypes.string,
    action: PropTypes.string,
    value: PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.string
    })
};

export default FilterInputModal;