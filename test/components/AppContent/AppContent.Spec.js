import React from 'react';
import { AppContent } from 'components/AppContent/AppContent';
import { MemoryRouter, withRouter } from 'react-router-dom';
import { mount } from 'enzyme';

jest.mock('components/UI/Alert/Alert', () => () => 'Alert');
jest.mock('components/AppContent/VideoListLayout/VideoListLayout', () => () => 'VideoListLayout');
jest.mock('components/AppContent/Scanning/Scanning', () => () => 'Scanning');

const createComponent = (props = {}, route = '/') => {
    const AppContentRouter = withRouter(AppContent);

    return mount(
        <MemoryRouter initialEntries={ [ route ] }>
            <AppContentRouter { ...props } />
        </MemoryRouter>
    );
};

const checkIsScanning = jest.fn();
const showErrorAlert = jest.fn(ex => console.log(ex));
const props = {
    checkIsScanning,
    showErrorAlert,
    isScanning: false
};

describe('AppContent', () => {
    beforeEach(() => {
        checkIsScanning.mockReset();
        showErrorAlert.mockReset();
    });

    it('renders successfully with VideoListComponent for root route', (done) => {
        const component = createComponent(props);

        setImmediate(() => {
            expect(checkIsScanning).toHaveBeenCalled();
            expect(showErrorAlert).not.toHaveBeenCalled();
            expect(component.find('AppContent').state()).toEqual(expect.objectContaining({
                isStarted: true
            }));
            component.update();
            expect(component.find('AppContent Container')).toHaveLength(2);
            expect(component.find('AppContent Route').text().trim()).toEqual('VideoListLayout');
            done();
        });
    });

    it('renders Scanning component for /scanning route', (done) => {
        const component = createComponent({ ...props, isScanning: true }, '/scanning');

        setImmediate(() => {
            component.update();
            expect(component.find('AppContent Route').text().trim()).toEqual('Scanning');
            done();
        });
    });

    it('won\'t render Scanning component if isScanning is false', (done) => {
        const component = createComponent(props, '/scanning');

        setImmediate(() => {
            component.update();
            expect(component.find('AppContent Route').text().trim()).toEqual('VideoListLayout');
            done();
        });
    });
});