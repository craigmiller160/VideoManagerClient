import React from 'react';
import { act } from 'react-dom/test-utils';
import AppContent from 'components/AppContent/AppContent';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

jest.mock('components/UI/Alert/Alert', () => {
    const Alert = (props) => <div>{ props.children }</div>;
    return Alert;
});
jest.mock('components/AppContent/AppRoutes', () => {
    const AppRoutes = (props) => <div>{ props.children }</div>;
    return AppRoutes;
});
jest.mock('components/AppContent/VideoNavbar/VideoNavbar', () => {
    const VideoNavbar = (props) => <div>{ props.children }</div>;
    return VideoNavbar;
});

jest.mock('store/auth/auth.actions', () => ({
    checkAuth: () => ({ type: 'checkAuth' }),
    logout: () => ({ type: 'logout' })
}));
jest.mock('store/scanning/scanning.actions', () => ({
    checkIsScanning: () => ({ type: 'checkIsScanning' }),
}));
jest.mock('store/videoSearch/videoSearch.actions', () => ({
    loadFilterOptions: () => ({ type: 'loadFilterOptions' })
}));
jest.mock('store/alert/alert.actions', () => ({
    hideAlert: () => ({ type: 'hideAlert' })
}));

const mockStore = configureMockStore([thunk]);
const defaultState = {
    scanning: {
        isScanning: false
    },
    alert: {},
    auth: {
        isAuth: false
    }
};

const doMount = (state = defaultState) => {
    const store = mockStore(state);
    const component = mount(
        <Provider store={ store }>
            <MemoryRouter initialEntries={ [ '/' ] }>
                <AppContent />
            </MemoryRouter>
        </Provider>
    );
    return [component, store];
};

describe('AppContent', () => {
    it('renders the initial component pre-effects', () => {
        const [component] = doMount();

        expect(component.find('VideoNavbar')).toHaveLength(1);
        expect(component.find('VideoNavbar').props()).toEqual(expect.objectContaining({
            disabled: true
        }));
        expect(component.find('Alert')).toHaveLength(0);
        expect(component.find('AppRoutes')).toHaveLength(0);
    });

    it('runs auth check effect and starts component', async () => {
        const [component, store] = doMount();
        await act(async () => {
            jest.advanceTimersByTime(10000);
        });
        component.update();

        expect(component.find('VideoNavbar')).toHaveLength(1);
        expect(component.find('VideoNavbar').props()).toEqual(expect.objectContaining({
            disabled: true
        }));
        expect(component.find('Alert')).toHaveLength(1);
        expect(component.find('AppRoutes')).toHaveLength(1);
        expect(store.getActions()).toEqual([
            { type: 'checkAuth' }
        ]);
    });

    it('runs initial loading when authorized', async () => {
        const [component, store] = doMount({
            ...defaultState,
            auth: {
                ...defaultState.auth,
                isAuth: true
            }
        });
        await act(async () => {
            jest.advanceTimersByTime(10000);
        });
        component.update();

        expect(component.find('VideoNavbar')).toHaveLength(1);
        expect(component.find('VideoNavbar').props()).toEqual(expect.objectContaining({
            disabled: false
        }));
        expect(component.find('Alert')).toHaveLength(1);
        expect(component.find('AppRoutes')).toHaveLength(1);
        expect(store.getActions()).toEqual([
            { type: 'checkAuth' },
            { type: 'loadFilterOptions' },
            { type: 'checkIsScanning' }
        ]);
    });

    it('hides alert on click', async () => {
        const [component, store] = doMount();
        await act(async () => {
            jest.advanceTimersByTime(10000);
        });
        component.update();

        component.find('div').at(0).simulate('click');
        expect(store.getActions()).toEqual(expect.arrayContaining([
            { type: 'hideAlert' }
        ]));
    });
});