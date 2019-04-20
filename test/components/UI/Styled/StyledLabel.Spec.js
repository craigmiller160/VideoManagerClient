import React from 'react';
import { mount } from 'enzyme';
import StyledLabel from 'components/UI/Styled/StyledLabel';

describe('StyledLabel', () => {
    it('renders correctly', () => {
        const component = mount(<StyledLabel/>);
        expect(component).toMatchSnapshot();
    });
});