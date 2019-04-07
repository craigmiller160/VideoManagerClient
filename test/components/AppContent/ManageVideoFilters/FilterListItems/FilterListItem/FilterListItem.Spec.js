import React from 'react';
import { mount } from 'enzyme';
import FilterListItem from 'components/AppContent/ManageVideoFilters/FilterListItems/FilterListItem/FilterListItem';

const label = 'MyLabel';
const click = jest.fn();

const defaultProps = {
    label,
    click
};

const doMount = (props = defaultProps) => mount(
    <FilterListItem { ...props } />
);

describe('FilterListItem', () => {
    beforeEach(() => {
        click.mockReset();
    });

    it('renders correctly', () => {
        const component = doMount();
        expect(component.find('p')).toHaveLength(1);
        expect(component.find('p').text()).toEqual(label);
    });

    it('calls click listener', () => {
        const component = doMount();
        component.find('p').simulate('click');
        expect(click).toHaveBeenCalled();
    });
});