import React from 'react';
import Modal from 'components/UI/Modal/Modal';
import Form from 'components/UI/form/Form/Form';
import PropTypes from 'prop-types';
import Input from 'components/UI/form/Input/Input';
import { CATEGORY_TYPE, SERIES_TYPE, STAR_TYPE } from '../../../store/filterInputModal/filterInputModal.reducer';

const FORM_NAME = 'filterInputForm';
export const ACTION_ADD = 'Add';
export const ACTION_EDIT = 'Edit';

const FilterInputModal = (props) => {
    const {
        open,
        close,
        submit,
        type,
        action
    } = props;

    const title = (() => {
        switch (type) {
            case CATEGORY_TYPE: return 'Category';
            case SERIES_TYPE: return 'Series';
            case STAR_TYPE: return 'Star';
            default: return '';
        }
    })();

    return (
        <Modal
            open={ open }
            close={ close }
            title={ title }
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

FilterInputModal.defaultProps = {
    action: ACTION_ADD
};

FilterInputModal.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
    submit: PropTypes.func,
    type: PropTypes.string,
    action: PropTypes.string
};

export default FilterInputModal;