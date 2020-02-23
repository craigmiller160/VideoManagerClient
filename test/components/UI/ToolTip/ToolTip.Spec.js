import React from 'react';
import { shallow } from 'enzyme';
import ToolTip from 'components/UI/ToolTip';

describe('ToolTip', () => {
    describe('rendering', () => {
        it('renders correctly', () => {
            const component = shallow(
                <ToolTip text="My Text">
                    <p>Hello World</p>
                </ToolTip>
            );
            expect(component.find('div.ToolTip')).toHaveLength(1);
            expect(component.find('p').text()).toEqual('Hello World');
            expect(component.find('span.ToolTipText').text()).toEqual('My Text');
        });
    });
});