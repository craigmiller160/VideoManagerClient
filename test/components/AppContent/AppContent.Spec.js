import React from 'react';
import { AppContent } from 'components/AppContent/AppContent';
import { MemoryRouter, withRouter } from 'react-router-dom';
import { mount } from 'enzyme';

jest.mock('components/UI/Alert/Alert', () => {
    const Alert = () => <div />;
    return Alert;
});
jest.mock('components/AppContent/AppRoutes', () => {
    const AppRoutes = () => <div />;
    return AppRoutes;
});

const createComponent = (props = {}, route = '/') => {
    const AppContentRouter = withRouter(AppContent);

    return mount(
        <MemoryRouter initialEntries={ [ route ] }>
            <AppContentRouter { ...props } />
        </MemoryRouter>
    );
};

const startFileScan = jest.fn();
const loadFilterOptions = jest.fn();
const checkIsScanning = jest.fn();
const showErrorAlert = jest.fn();
const props = {
    startFileScan,
    loadFilterOptions,
    checkIsScanning,
    showErrorAlert,
    isScanning: false
};

// TODO completely redo these tests

describe('AppContent', () => {
    beforeEach(() => {
        checkIsScanning.mockReset();
        showErrorAlert.mockReset();
    });

    it('renders the initial component pre-effects', () => {
        throw new Error('Finish this');
    });

    it('renders component after running effects', () => {
        throw new Error('Finish this');
    });

    // TODO everything below here should be deleted

    it('renders successfully with VideoListComponent for root route', (done) => {
        const component = createComponent(props);
        requestAnimationFrame(() => {
            expect(loadFilterOptions).toHaveBeenCalled();
            expect(checkIsScanning).toHaveBeenCalled();
            expect(component.find('AppContent Container')).toHaveLength(1);
            expect(showErrorAlert).not.toHaveBeenCalled();
            component.update(); // This is when isStarted is set to true
            expect(component.find('AppContent Container')).toHaveLength(2);
            expect(component.find('AppContent Route').at(1).text().trim()).toEqual('VideoListLayout');
            done();
        });
    });

    it('renders Scanning component for /scanning route', (done) => {
        const component = createComponent({ ...props, isScanning: true }, '/scanning');

        requestAnimationFrame(() => {
            component.update();
            expect(component.find('AppContent Route').at(1).text().trim()).toEqual('Scanning');
            done();
        });
    });

    it('won\'t render Scanning component if isScanning is false', (done) => {
        const component = createComponent(props, '/scanning');

        requestAnimationFrame(() => {
            component.update();
            expect(component.find('AppContent Route').at(1).text().trim()).toEqual('VideoListLayout');
            done();
        });
    });
});