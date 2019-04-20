import React from 'react';
import { mount } from 'enzyme';
import Scanning from 'components/AppContent/Scanning/Scanning';

const defaultProps = {

};

const doMount = (props) => mount(
    <Scanning { ...props } />
);

describe('Scanning', () => {
    it('renders component', () => {
        throw new Error('Finish this');
    });

    it('checks is scanning on interval', () => {
        throw new Error('Finish this');
    });

    it('stops checking is scanning when unmounted', () => {
        throw new Error('Finish this');
    });
});