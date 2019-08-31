import React from 'react';
import { mount } from 'enzyme';
import StyledTextArea from 'components/UI/Styled/StyledTextArea';

describe('StyledTextArea', () => {
    it('renders correctly', () => {
        const component = mount(<StyledTextArea/>);
        expect(component).toHaveStyleRule('resize', 'none');
        expect(component).toHaveStyleRule('display', 'block');
        expect(component).toHaveStyleRule('width', '100%');
        expect(component).toHaveStyleRule('border', '1px solid lightgray');
    });

    it('renders with resizing', () => {
        const component = mount(
            <StyledTextArea resize />
        );
        expect(component).toHaveStyleRule('resize', 'both');
    });

    it('renders with error', () => {
        const component = mount(
            <StyledTextArea hasError />
        );
        expect(component).toHaveStyleRule('border', '1px solid #dc3545');
    });
});