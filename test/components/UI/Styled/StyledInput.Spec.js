import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components'
import StyledInput from 'components/UI/Styled/StyledInput';

describe('StyledInput', () => {
    it('renders correctly', () => {
        const component = mount(<StyledInput/>);
        expect(component).toMatchSnapshot();
    });
});