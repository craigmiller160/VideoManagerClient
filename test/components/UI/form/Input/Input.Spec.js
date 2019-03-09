import React from 'react';
import { InputComponent } from 'components/UI/form/Input/Input';
import { mount } from 'enzyme';

describe('Input', () => {
    const props = {
        label: 'My Input',
        type: 'text',
        input: {
            name: 'MyInput'
        }
    };

    it('should render correctly', () => {
        const component = mount(
            <InputComponent { ...props } />
        );
        expect(component.find('FormGroup')).toHaveLength(1);
        expect(component.find('FormGroup').hasClass('hidden')).toEqual(false);
        expect(component.find('label')).toHaveLength(1);
        expect(component.find('label').text()).toEqual('My Input');
        expect(component.find('input')).toHaveLength(1);
        expect(component.find('input').props()).toEqual(expect.objectContaining({
            type: 'text',
            name: 'MyInput'
        }));
    });

    it('is invisible if type is hidden', () => {
        const component = mount(
            <InputComponent { ...props } type="hidden" />
        );
        expect(component.find('FormGroup').hasClass('hidden')).toEqual(true);
    });
});