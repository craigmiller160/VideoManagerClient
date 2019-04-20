import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components'
import StyledFormGroupDiv from 'components/UI/Styled/StyledFormGroupDiv';

const doMount = (props = {}) => mount(
    <StyledFormGroupDiv { ...props } />
);

describe('StyledFromGroupDiv', () => {
    it('renders correctly with display block', () => {
        const component = doMount();
        expect(component).toHaveStyleRule('text-align', 'left');
        expect(component).toHaveStyleRule('margin-bottom', '10px');
        expect(component).toHaveStyleRule('display', 'block');
    });

    it('renders correctly with display none', () => {
        const component = doMount({ hidden: true });
        expect(component).toHaveStyleRule('display', 'none');
    });
});
