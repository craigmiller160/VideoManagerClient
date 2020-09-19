/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ReactModal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Form from 'components/UI/form/Form/Form';

const Modal = (props) => {
    const {
        id,
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
                        id={ btn.id }
                        key={ index }
                        color={ btn.color }
                        type={ btn.type ? btn.type : 'button' }
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
            id={ id }
            isOpen={ open }
            { ...modalProps }
        >
            {
                hasForm &&
                    <Form
                        form={ form.name }
                        onSubmit={ (values) => {
                            close();
                            form.handleSubmit(values);
                        } }
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
    id: '',
    title: 'Modal',
    modalProps: {},
    modalBtns: [],
    form: {
        initialValues: {}
    }
};

Modal.propTypes = {
    id: PropTypes.string,
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
        id: PropTypes.string,
        color: PropTypes.string,
        text: PropTypes.string,
        type: PropTypes.string,
        onClick: PropTypes.func,
        closeModal: PropTypes.bool
    }))
};

export default Modal;