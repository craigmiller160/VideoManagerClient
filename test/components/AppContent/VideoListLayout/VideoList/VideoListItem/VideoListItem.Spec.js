import React from 'react';
import { mount } from 'enzyme';
import VideoListItem from 'components/AppContent/VideoListLayout/VideoList/VideoListItem/VideoListItem';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const defaultProps = {
    videoFile: {
        fileId: 1,
        expanded: false,
        series: [],
        categories: [],
        stars: []
    }
};

const mockStore = configureMockStore([thunk]);

const doMount = (props = defaultProps) => {
    const store = mockStore({});
    const component = mount(
        <Provider store={ store }>
            <MemoryRouter initialEntries={ [ '/' ] }>
                <VideoListItem { ...props } />
            </MemoryRouter>
        </Provider>
    );
    return [component, store];
};

describe('VideoListItem', () => {
    it('shows smaller view', () => {
        const [component] = doMount();
        expect(component.find('Collapse').props()).toEqual(expect.objectContaining({
            isOpen: false
        }));
    });

    it('shows expanded view', () => {
        const [component] = doMount({ ...defaultProps, videoFile: { ...defaultProps.videoFile, expanded: true } });
        expect(component.find('Collapse').props()).toEqual(expect.objectContaining({
            isOpen: true
        }));
    });

    it('handles clicks', () => {
        const [component, store] = doMount();
        component.simulate('click');
        expect(store.getActions()).toEqual([
            { type: 'videoList/expandVideoFile', payload: 1 }
        ]);
    });

    it('renders without edit role', () => {
        throw new Error('Finish this');
    });
});
