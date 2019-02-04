import React from 'react';
import Modal from 'components/UI/Modal/Modal';
import { mount } from 'enzyme';

describe('Modal component', () => {
    it('renders correctly', () => {
        const title = 'Test Modal';
        const bodyText = 'Hello World';
        const closeFn = jest.fn();
        const modalBtns = [
            {
                color: 'primary',
                text: 'MyBtn',
                onClick: jest.fn(),
                closeModal: true
            }
        ];

        const component = mount(
            <Modal
                open
                close={ closeFn }
                title={ title }
                modalBtns={ modalBtns }
            >
                <p>{ bodyText }</p>
            </Modal>
        );

        expect(component.find('h5.modal-title').text()).toEqual(title);
        expect(component.find('div.modal-body > p').text()).toEqual(bodyText);
        component.find('button.close[type="button"]').simulate('click');
        expect(closeFn).toHaveBeenCalledTimes(1);

        const button = component.find('div.modal-footer > Button').at(0);
        expect(button.text()).toEqual(modalBtns[0].text);
        expect(button.props()).toEqual(expect.objectContaining({
            color: modalBtns[0].color
        }));
        button.simulate('click');
        expect(modalBtns[0].onClick).toHaveBeenCalledTimes(1);
        expect(closeFn).toHaveBeenCalledTimes(2);
    });
});