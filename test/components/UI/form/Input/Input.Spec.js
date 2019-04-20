import React from 'react';
import { InputComponent, InnerComponent } from 'components/UI/form/Input/Input';
import { mount } from 'enzyme';

describe('Input', () => {
    const props = {
        label: 'My Input',
        type: 'text',
        input: {
            name: 'MyInput'
        }
    };

    it('should render InnerComponent as input', () => {
        const component = mount(
            <InnerComponent type="text" />
        );
        expect(component.find('StyledInput')).toHaveLength(1);
        expect(component.find('StyledTextArea')).toHaveLength(0);
    });

    it('should render InnerComponent as textarea', () => {
        const component = mount(
            <InnerComponent type="textarea" />
        );
        expect(component.find('StyledInput')).toHaveLength(0);
        expect(component.find('StyledTextArea')).toHaveLength(1);
    });

    it('should render correctly', () => {
        const component = mount(
            <InputComponent { ...props } />
        );

        expect(component.find('StyledFormGroupDiv')).toHaveLength(1);
        expect(component.find('StyledFormGroupDiv')).toHaveStyleRule('display', 'block');
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
        expect(component.find('StyledFormGroupDiv')).toHaveStyleRule('display', 'none');
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
        expect(component.find('StyledTextArea')).toHaveStyleRule('resize', 'none');
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
        expect(component.find('StyledTextArea')).toHaveStyleRule('resize', 'both');
    });
});