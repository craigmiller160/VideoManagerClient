import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ReactModal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const Modal = (props) => {
    const {
        open,
        title,
        children,
        modalProps,
        modalBtns,
        close
    } = props;

    return (
        <ReactModal
            isOpen={ open }
            { ...modalProps }
        >
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
        </ReactModal>
    );
};

Modal.defaultProps = {
    title: 'Modal',
    modalProps: {},
    modalBtns: []
};

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    title: PropTypes.string,
    modalProps: PropTypes.shape(ReactModal.propTypes),
    modalBtns: PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string,
        text: PropTypes.string,
        onClick: PropTypes.func,
        closeModal: PropTypes.bool
    }))
};

export default Modal;