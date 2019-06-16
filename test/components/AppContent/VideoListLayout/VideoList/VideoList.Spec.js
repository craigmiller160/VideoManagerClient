import React from 'react';
import { mount } from 'enzyme';
import { VideoList } from 'components/AppContent/VideoListLayout/VideoList/VideoList';

jest.mock('components/AppContent/VideoListLayout/VideoList/VideoListItem/VideoListItem', () => {
    const VideoListItem = () => <div />;
    return VideoListItem;
});
jest.mock('components/UI/Spinner/Spinner', () => {
    const Spinner = () => <div />;
    return Spinner;
});
jest.mock('', () => {
    const Pagination = () => <div />;
    return Pagination;
});

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
const props = {
    totalItems: 0,
    itemsPerPage: 0,
    currentPage: 0,
    videoList: [],
    searching: false,
    searchForVideos,
    setCurrentPage,
    expandVideoFile
};

const createComponent = (props = {}) => mount(
    <VideoList { ...props } />
);

describe('VideoList', () => {
    beforeEach(() => {
        searchForVideos.mockReset();
        setCurrentPage.mockReset();
        expandVideoFile.mockReset();
    });

    it('shows spinner while searching', (done) => {
        const component = createComponent({ ...props, searching: true });
        requestAnimationFrame(() => {
            expect(searchForVideos).toHaveBeenCalled();
            expect(component.find('Spinner')).toHaveLength(1);
            expect(component.find('VideoListItem')).toHaveLength(0);
            expect(component.find('Pagination')).toHaveLength(0);
            expect(component.find('h3')).toHaveLength(1);
            done();
        });
    });

    it('shows no videos if list length is 0', () => {
        const component = createComponent(props);
        requestAnimationFrame(() => {
            expect(searchForVideos).toHaveBeenCalled();
            expect(component.find('Spinner')).toHaveLength(0);
            expect(component.find('VideoListItem')).toHaveLength(0);
            expect(component.find('Pagination')).toHaveLength(0);
            expect(component.find('h3')).toHaveLength(2);
            expect(component.find('h3').at(1).text()).toEqual('No Videos Available');
        });
    });

    it('shows videos and pagination', () => {
        const component = createComponent({ ...props, videoList, ...pagination });
        requestAnimationFrame(() => {
            expect(searchForVideos).toHaveBeenCalled();
            expect(component.find('Spinner')).toHaveLength(0);
            expect(component.find('VideoListItem')).toHaveLength(2);
            expect(component.find('Pagination')).toHaveLength(2);
            expect(component.find('h3')).toHaveLength(1);

            expect(component.find('Pagination').at(0).props().totalPages).toEqual(4);
        });
    });
});