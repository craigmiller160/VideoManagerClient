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
import { InputComponent, InnerComponent } from 'components/UI/form/Input/Input';
import { mount } from 'enzyme';

describe('Input', () => {
    const props = {
        label: 'My Input',
        type: 'text',
        input: {
            name: 'MyInput'
        },
        meta: {
            touched: false,
            error: null
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
        expect(component.find('span.text-danger')).toHaveLength(0);
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

    it('renders with error text', () => {
        const newProps = {
            ...props,
            meta: {
                touched: true,
                error: 'My Error'
            }
        };
        const component = mount(
            <InputComponent { ...newProps } />
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
        expect(component.find('span.text-danger')).toHaveLength(1);
    });

    it('focuses on render', () => {
        const newProps = {
            ...props,
            focusOnRender: true
        };
        const component = mount(
            <InputComponent { ...newProps } />
        );

        expect(component.find('input').getDOMNode()).toEqual(document.activeElement);
    });
});