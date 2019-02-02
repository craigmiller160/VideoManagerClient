import React from 'react';
import { AppContent } from '../AppContent';
import { MemoryRouter, withRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

jest.mock('../../UI/Alert/Alert', () => () => 'Alert');
jest.mock('../VideoListLayout/VideoListLayout', () => () => 'VideoListLayout');

const createComponent = (props = {}, route = '/') => {
    const AppContentRouter = withRouter(AppContent);

    return mount(
        <MemoryRouter initalEntries={ [ route ] }>
            <AppContentRouter { ...props } />
        </MemoryRouter>
    );
};

const checkIsScanning = jest.fn();
const showErrorAlert = jest.fn(ex => console.log(ex));
const props = {
    checkIsScanning,
    showErrorAlert
};

describe('AppContent', () => {
    it('renders successfully with VideoListComponent for root route', (done) => {
        const component = createComponent(props);

        setImmediate(() => {
            expect(checkIsScanning).toHaveBeenCalled();
            expect(showErrorAlert).not.toHaveBeenCalled();
            expect(component.find('AppContent').state()).toEqual(expect.objectContaining({
                isStarted: true
            }));
            component.update();
            expect(component.find('AppContent Container').length).toEqual(2);
            expect(component.find('AppContent Route').text().trim()).toEqual('VideoListLayout');
            done();
        });
    });

    it('renders Scanning component for /scanning route', (done) => {
        const component = createComponent(props, '/scanning');

        setImmediate(() => {
            expect(checkIsScanning).toHaveBeenCalled();
            expect(showErrorAlert).not.toHaveBeenCalled();
            expect(component.find('AppContent').state()).toEqual(expect.objectContaining({
                isStarted: true
            }));
            component.update();
            expect(component.find('AppContent Container').length).toEqual(2);
            expect(component.find('AppContent Route').text().trim()).toEqual('Scanning');
            done();
        });
    });
});