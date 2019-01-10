import React from 'react';
import Input from '../Input';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// TODO look into mount vs shallow in more detail

describe('Input', () => {
    const props = {
        label: 'My Input',
        type: 'text',
        name: 'MyInput'
    };

    it('should render correctly', () => {
        const component = mount(
            <Input { ...props } />
        );
        expect(component).toMatchSnapshot();
    });

    it('should handle onChange', () => {
        let value = 'InitialValue';
        props.onChange = (newValue) => value = newValue.target.value;

        const component = mount(
            <Input { ...props } />
        );

        const result = component.find('input');
        result.simulate('change', {target: {value: 'My New Value'}});
        expect(value).toEqual('My New Value');
    });
});