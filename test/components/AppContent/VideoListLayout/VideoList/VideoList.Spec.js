import React from 'react';
import { mount } from 'enzyme';
import VideoList from 'components/AppContent/VideoListLayout/VideoList/VideoList';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';

jest.mock('components/AppContent/VideoListLayout/VideoList/VideoListItem/VideoListItem', () => {
    const VideoListItem = () => <div />;
    return VideoListItem;
});
jest.mock('components/UI/Spinner/Spinner', () => {
    const Spinner = () => <div />;
    return Spinner;
});
jest.mock('components/AppContent/VideoListLayout/VideoList/VideoListPagination', () => {
    const VideoListPagination = () => <div />;
    return VideoListPagination;
});

jest.mock('store/videoList/videoList.actions', () => ({
    searchForVideos: () => (dispatch) => dispatch({ type: 'SearchForVideos' })
}));

const videoList = [
    { fileId: 1 },
    { fileId: 2 }
];

const pagination = {
    totalItems: 36,
    itemsPerPage: 10
};

const searchForVideos = jest.fn();
const setCurrentPage = jest.fn();
const expandVideoFile = jest.fn();
const defaultProps = {
    totalItems: 0,
    itemsPerPage: 0,
    currentPage: 0,
    videoList: [],
    searching: false,
    searchForVideos,
    setCurrentPage,
    expandVideoFile
};

const mockStore = configureMockStore([thunk]);
const defaultState = {
    videoList: {
        currentPage: 0,
        videoList: [],
        totalItems: 36,
        itemsPerPage: 10
    },
    videoSearch: {
        searching: false
    }
};

const doMount = (state = defaultState) => {
    const store = mockStore(state);
    const component = mount(
        <Provider store={ store }>
            <VideoList />
        </Provider>
    );
    return [component, store];
};

describe('VideoList', () => {
    beforeEach(() => {
        // searchForVideos.mockReset();
        // setCurrentPage.mockReset();
        // expandVideoFile.mockReset();
    });

    describe('dispatches searchForVideos', () => {
        it('runs on mount', () => {
            const [, store] = doMount();
            expect(store.getActions()).toEqual(expect.arrayContaining([
                { type: 'SearchForVideos' }
            ]));
        });

        it('runs on current page change', () => {
            throw new Error('Finish this');
        });
    });

    describe('rendering', () => {
        it('renders with no videos', () => {
            const [component] = doMount();
            expect(component.find('h3#video-list-title').text()).toEqual('Available Videos');
            expect(component.find('h3#no-videos-available').text()).toEqual('No Videos Available');
            expect(component.find('ListGroup')).toHaveLength(0);
            expect(component.find('Spinner')).toHaveLength(0);
        });

        it('renders while searching', () => {
            const [component] = doMount({
                ...defaultState,
                videoSearch: {
                    ...defaultState.videoSearch,
                    searching: true
                }
            });
            expect(component.find('h3#video-list-title').text()).toEqual('Available Videos');
            expect(component.find('h3#no-videos-available')).toHaveLength(0);
            expect(component.find('ListGroup')).toHaveLength(0);
            expect(component.find('Spinner')).toHaveLength(1);
        });

        it('renders with videos', () => {
            const [component] = doMount({
                ...defaultState,
                videoList: {
                    ...defaultState.videoList,
                    videoList
                }
            });
            expect(component.find('h3#video-list-title').text()).toEqual('Available Videos');
            expect(component.find('h3#no-videos-available')).toHaveLength(0);
            expect(component.find('ListGroup')).toHaveLength(1);
            expect(component.find('Spinner')).toHaveLength(0);
            expect(component.find('VideoListItem')).toHaveLength(2);
            expect(component.find('VideoListItem').at(0).props()).toEqual(expect.objectContaining({
                videoFile: videoList[0]
            }));
            expect(component.find('VideoListItem').at(1).props()).toEqual(expect.objectContaining({
                videoFile: videoList[1]
            }));
        });
    });
});
