import React from 'react';
import { mount } from 'enzyme';
import AddButton from 'components/UI/AddButton/AddButton';

const addItem = jest.fn();
const defaultProps = {
    addItem
};

const doMount = (props = defaultProps) => mount(
    <AddButton { ...props } />
);

describe('AddButton', () => {
    beforeEach(() => {
        addItem.mockReset();
    });

    it('renders correctly', () => {
        const component = doMount();
        expect(component.find('button')).toHaveLength(1);
        expect(component.find('button').text()).toEqual('+');
    });

    it('calls addItem on click', () => {
        const component = doMount();
        component.find('button').simulate('click');
        expect(addItem).toHaveBeenCalled();
    });
});