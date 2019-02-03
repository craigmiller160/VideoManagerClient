import React from 'react';
import Select from '../../../../../src/components/UI/form/Select/Select';
import { shallow } from 'enzyme';

describe('Select', () => {
    const props = {
        label: 'My Select',
        name: 'MySelect',
        options: [
            { label: 'Opt1', value: 'opt1' },
            { label: 'Opt2', value: 'opt2' }
        ]
    };

    it('should render correctly', () => {
        const component = shallow(
            <Select { ...props } />
        );
        expect(component).toMatchSnapshot();
    });

    it('should handle onChange', () => {
        let value = 'InitialValue';
        props.onChange = (newValue) => value = newValue;

        const component = shallow(
            <Select { ...props } />
        );

        const result = component.find('[name="MySelect"]');
        expect(result.length).toEqual(1);

        result.simulate('change', { label: 'Opt2', value: 'opt2' });
        expect(value).toEqual({ label: 'Opt2', value: 'opt2' });
    });
});