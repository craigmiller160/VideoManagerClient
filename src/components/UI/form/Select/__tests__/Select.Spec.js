import React from 'react';
import Select from '../Select';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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