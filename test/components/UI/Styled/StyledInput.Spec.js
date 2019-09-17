import React from 'react';
import { mount } from 'enzyme';
import StyledInput from 'components/UI/Styled/StyledInput';

describe('StyledInput', () => {
    it('renders correctly', () => {
        const component = mount(<StyledInput/>);
        expect(component).toMatchSnapshot();
        expect(component).toHaveStyleRule('border', '1px solid lightgray');
    });

    it('renders with error', () => {
        const component = mount(<StyledInput hasError /> );
        expect(component).toHaveStyleRule('border', '1px solid #dc3545');
    });
});