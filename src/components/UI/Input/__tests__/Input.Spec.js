import React from 'react';
import Input from '../Input';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Input', () => {
    const props = {
        label: 'My Input',
        type: 'text',
        name: 'MyInput'
    };

    it('should render correctly', () => {
        const component = shallow(
            <Input { ...props } />
        );
        expect(component).toMatchSnapshot();
    });

    it('should handle onChange', () => {
        let value = 'InitialValue';
        props.onChange = (newValue) => value = newValue.target.value;

        const component = shallow(
            <Input { ...props } />
        );

        const result = component.find('Input');
        expect(result.length).toEqual(1);
        result.simulate('change', {target: {value: 'My New Value'}});
        expect(value).toEqual('My New Value');
    });
});