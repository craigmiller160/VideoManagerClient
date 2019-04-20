import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components'
import StyledTextArea from 'components/UI/Styled/StyledLabel';

describe('StyledTextArea', () => {
    it('renders correctly', () => {
        const component = mount(<StyledTextArea/>);
        expect(component).toMatchSnapshot();
    });
});