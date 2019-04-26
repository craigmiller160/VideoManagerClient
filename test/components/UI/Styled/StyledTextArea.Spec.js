import React from 'react';
import { mount } from 'enzyme';
import StyledTextArea from 'components/UI/Styled/StyledTextArea';

describe('StyledTextArea', () => {
    it('renders correctly', () => {
        const component = mount(<StyledTextArea/>);
        expect(component).toHaveStyleRule('resize', 'none');
        expect(component).toHaveStyleRule('display', 'block');
        expect(component).toHaveStyleRule('width', '100%');
    });

    it('renders with resizing', () => {
        const component = mount(
            <StyledTextArea resize />
        );
        expect(component).toHaveStyleRule('resize', 'both');
    });
});