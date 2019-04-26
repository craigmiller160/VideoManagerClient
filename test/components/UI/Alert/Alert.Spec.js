import React from 'react';
import { mount } from 'enzyme';
import Alert from 'components/UI/Alert/Alert';

const hideAlert = jest.fn();

const defaultProps = {
    alert: {
        color: 'success',
        message: 'My Message',
        show: false
    },
    hideAlert
};

const doMount = (props = defaultProps) => mount(
    <Alert { ...props } />
);


describe('Alert', () => {
    beforeEach(() => {
        hideAlert.mockReset();
    });

    it('renders correctly', () => {
        const component = doMount();
        expect(component.find('div.Alert').props()).toEqual(expect.objectContaining({
            className: expect.stringContaining('success')
        }));
        expect(component.find('div.Alert > span').text()).toEqual('My Message');
    });

    it('renders and shows', () => {
        const component = doMount({
            ...defaultProps,
            alert: {
                ...defaultProps.alert,
                show: true
            }
        });
        expect(component.find('div.Alert').props()).toEqual(expect.objectContaining({
            className: expect.stringContaining('show')
        }))
    });

    it('calls hideAlert', () => {
        const component = doMount();
        component.find('button').simulate('click');
        expect(hideAlert).toHaveBeenCalled();
    });
});