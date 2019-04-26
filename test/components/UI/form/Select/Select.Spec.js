import React from 'react';
import { SelectComponent } from 'components/UI/form/Select/Select';
import { mount } from 'enzyme';

describe('Select', () => {
    const props = {
        label: 'My Select',
        name: 'MySelect',
        options: [
            { label: 'Opt1', value: 'opt1' },
            { label: 'Opt2', value: 'opt2' }
        ],
        multi: false
    };

    it('should render correctly', () => {
        const component = mount(
            <SelectComponent { ...props } />
        );
        expect(component.find('StyledFormGroupDiv')).toHaveLength(1);
        expect(component.find('SelectComponent')).toHaveLength(1);
        expect(component.find('SelectComponent').props()).toEqual(expect.objectContaining({
            ...props
        }));
        expect(component.find('label')).toHaveLength(1);
        expect(component.find('label').text()).toEqual('My Select');

    });
});