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
        expect(component.find('textarea')).toHaveLength(0);
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

    it('renders textarea', () => {
        const newProps = {
            ...props,
            type: 'textarea',
            textarea: {
                rows: 10,
                cols: 10
            }
        };
        const component = mount(
            <InputComponent { ...newProps } />
        );
        const textarea = component.find('textarea');
        expect(textarea).toHaveLength(1);
        expect(textarea.props()).toEqual(expect.objectContaining({
            name: 'MyInput',
            rows: 10,
            cols: 10
        }));
        expect(textarea.hasClass('no-resize')).toEqual(true);
    });

    it('renders textarea with resizing', () => {
        const newProps = {
            ...props,
            type: 'textarea',
            textarea: {
                resize: true
            }
        };
        const component = mount(
            <InputComponent { ...newProps } />
        );
        const textarea = component.find('textarea');
        expect(textarea).toHaveLength(1);
        expect(textarea.hasClass('no-resize')).toEqual(false);
    });
});