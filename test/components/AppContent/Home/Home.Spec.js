import React from 'react';
import { shallow } from 'enzyme';
import Home from 'components/AppContent/Home/Home';

describe('Home', () => {
    it('renders correctly', () => {
        const component = shallow(
            <Home />
        );
        expect(component).toMatchSnapshot();
    });
});