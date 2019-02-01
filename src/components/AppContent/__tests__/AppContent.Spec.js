import React from 'react';
import { AppContent } from '../AppContent';
import { MemoryRouter, withRouter } from 'react-router-dom';
import { mount } from 'enzyme';

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
const hideAlert = jest.fn();
const props = {
    checkIsScanning,
    showErrorAlert,
    alert: {
        color: 'danger',
        message: 'Error',
        show: false
    },
    hideAlert
};

describe('AppContent', () => {
    it('renders successfully', (done) => {
        const component = createComponent(props);
        expect(checkIsScanning).toHaveBeenCalled();
        expect(showErrorAlert).not.toHaveBeenCalled();

        const appContent = component.find('AppContent');
    });
});