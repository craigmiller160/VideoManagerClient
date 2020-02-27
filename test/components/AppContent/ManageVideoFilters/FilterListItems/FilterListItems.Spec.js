import React from 'react';
import { mount } from 'enzyme';
import FilterListItems from 'components/AppContent/ManageVideoFilters/FilterListItems/FilterListItems';

const type = 'type';
const items = [
    { value: 1, label: 'label1' },
    { value: 2, label: 'label2' }
];
const showEditModal = jest.fn();

const defaultProps = {
    type,
    items,
    showEditModal
};

const doMount = (props = defaultProps) => mount(
    <FilterListItems { ...props } />
);

describe('FilterListItems', () => {
    beforeEach(() => {
        showEditModal.mockReset();
    });

    it('renders correctly', () => {
        const component = doMount();
        expect(component.find('FilterListItem')).toHaveLength(2);
        expect(component.find('FilterListItem').at(0).props()).toEqual({
            ...items[0],
            click: expect.any(Function),
            id: `${type}-filter-item-0`
        });
        expect(component.find('FilterListItem').at(1).props()).toEqual({
            ...items[1],
            click: expect.any(Function),
            id: `${type}-filter-item-1`
        });
    });

    it('calls showEditModal on click', () => {
        const component = doMount();
        component.find('FilterListItem').at(0).find('p').simulate('click');
        expect(showEditModal).toHaveBeenLastCalledWith(0);
        component.find('FilterListItem').at(1).find('p').simulate('click');
        expect(showEditModal).toHaveBeenLastCalledWith(1);
    });
});