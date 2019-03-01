import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ReactModal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Form from 'components/UI/form/Form/Form';

const Modal = (props) => {
    const {
        open,
        title,
        children,
        modalProps,
        modalBtns,
        close,
        form
    } = props;

    const hasForm = form && form.name;
    const modalContent = (
        <>
            <ModalHeader
                toggle={ close }
            >
                { title }
            </ModalHeader>
            <ModalBody>
                { children }
            </ModalBody>
            <ModalFooter>
                { modalBtns.map((btn, index) => (
                    <Button
                        key={ index }
                        color={ btn.color }
                        type={ btn.type }
                        onClick={ (event) => {
                            if (btn.closeModal) {
                                close();
                            }

                            if (btn.onClick) {
                                btn.onClick(event);
                            }
                        } }
                    >
                        { btn.text }
                    </Button>
                )) }
            </ModalFooter>
        </>
    );

    return (
        <ReactModal
            isOpen={ open }
            { ...modalProps }
        >
            {
                hasForm &&
                    <Form
                        form={ form.name }
                        handleSubmit={ form.handleSubmit }
                        initialValues={ form.initialValues }
                    >
                        { modalContent }
                    </Form>
            }
            {
                !hasForm &&
                    modalContent
            }
        </ReactModal>
    );
};

Modal.defaultProps = {
    title: 'Modal',
    modalProps: {},
    modalBtns: [],
    form: {
        initialValues: {}
    }
};

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    title: PropTypes.string,
    modalProps: PropTypes.shape(ReactModal.propTypes),
    form: PropTypes.shape({
        name: PropTypes.string.isRequired,
        handleSubmit: PropTypes.func,
        initialValues: PropTypes.object
    }),
    modalBtns: PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string,
        text: PropTypes.string,
        type: PropTypes.string,
        onClick: PropTypes.func,
        closeModal: PropTypes.bool
    }))
};

export default Modal;