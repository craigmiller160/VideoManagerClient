import React from 'react';
import Modal from 'components/UI/Modal/Modal';
import Form from 'components/UI/form/Form/Form';
import PropTypes from 'prop-types';
import Input from 'components/UI/form/Input/Input';

const FORM_NAME = 'filterInputForm';

const FilterInputModal = (props) => {
    const {
        open,
        close,
        submit
    } = props;

    return (
        <Modal
            open={ open }
            close={ close }
        >
            <Form
                form={ FORM_NAME }
                handleSubmit={ submit }
            >
                <Input label="Input" name="input" />
            </Form>
        </Modal>
    );
};

FilterInputModal.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
    submit: PropTypes.func
};

export default FilterInputModal;