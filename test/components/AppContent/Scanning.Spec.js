import React from 'react';
import { mount } from 'enzyme';
import Scanning from 'components/AppContent/Scanning/Scanning';

const checkIsScanning = jest.fn();
const defaultProps = {
    checkIsScanning
};

const doMount = (props = defaultProps) => mount(
    <Scanning { ...props } />
);

describe('Scanning', () => {
    beforeEach(() => {
        checkIsScanning.mockReset();
    });

    it('renders component', () => {
        const component = doMount();
        expect(component.find('Spinner#scanning-spinner')).toHaveLength(1);
    });

    it('starts and stops calling the checkIsScanning function', (done) => {
        const component = doMount();
        setTimeout(() => {
            component.unmount();
            const calledTimes = checkIsScanning.mock.results.length;
            expect(checkIsScanning).toHaveBeenCalledTimes(calledTimes);
            setTimeout(() => {
                expect(checkIsScanning).toHaveBeenCalledTimes(calledTimes);
                done();
            }, 1200);
        }, 1200);
    });
});