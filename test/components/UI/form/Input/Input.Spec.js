import React from 'react';
import Input from '../../../../../src/components/UI/form/Input/Input';
import { shallow } from 'enzyme';

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
        props.onChange = (newValue) => value = newValue;

        const component = shallow(
            <Input { ...props } />
        );

        const result = component.find('[name="MyInput"]');
        expect(result.length).toEqual(1);

        result.simulate('change', {target: {value: 'My New Value'}});
        expect(value).toEqual({target: {value: 'My New Value'}});
    });

    it('is invisible if type is hidden', () => {
        throw new Error('Finish this test');
    });
});