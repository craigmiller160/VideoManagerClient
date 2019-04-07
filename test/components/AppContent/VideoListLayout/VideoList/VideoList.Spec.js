import React from 'react';
import { mount } from 'enzyme';
import { VideoList, paginationClick } from 'components/AppContent/VideoListLayout/VideoList/VideoList';

jest.mock('components/AppContent/VideoListLayout/VideoList/VideoListItem/VideoListItem',
    () => (props) => <mock-video-list-item { ...props } />); // eslint-disable-line react/display-name
jest.mock('components/UI/Spinner/Spinner',
    () => (props) => <mock-spinner { ...props } />); // eslint-disable-line react/display-name
jest.mock('components/UI/Pagination/Pagination',
    () => (props) => <mock-pagination { ...props } />); // eslint-disable-line react/display-name

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
            expect(component.find('mock-spinner')).toHaveLength(1);
            expect(component.find('mock-video-list-item')).toHaveLength(0);
            expect(component.find('mock-pagination')).toHaveLength(0);
            expect(component.find('h3')).toHaveLength(1);
            done();
        });
    });

    it('shows no videos if list length is 0', () => {
        const component = createComponent(props);
        requestAnimationFrame(() => {
            expect(searchForVideos).toHaveBeenCalled();
            expect(component.find('mock-spinner')).toHaveLength(0);
            expect(component.find('mock-video-list-item')).toHaveLength(0);
            expect(component.find('mock-pagination')).toHaveLength(0);
            expect(component.find('h3')).toHaveLength(2);
            expect(component.find('h3').at(1).text()).toEqual('No Videos Available');
        });
    });

    it('shows videos and pagination', () => {
        const component = createComponent({ ...props, videoList, ...pagination });
        requestAnimationFrame(() => {
            expect(searchForVideos).toHaveBeenCalled();
            expect(component.find('mock-spinner')).toHaveLength(0);
            expect(component.find('mock-video-list-item')).toHaveLength(2);
            expect(component.find('mock-pagination')).toHaveLength(2);
            expect(component.find('h3')).toHaveLength(1);

            expect(component.find('mock-pagination').at(0).props().totalPages).toEqual(4);
        });
    });

    it('handles onClick from Pagination', () => {
        const props = {
            setCurrentPage,
            currentPage: 0,
            searchForVideos
        };

        paginationClick('<', props);
        expect(setCurrentPage).toHaveBeenLastCalledWith(-1);
        expect(searchForVideos).toHaveBeenCalledTimes(1);

        paginationClick('1', props);
        expect(setCurrentPage).toHaveBeenLastCalledWith(1);
        expect(searchForVideos).toHaveBeenCalledTimes(2);

        paginationClick('>', props);
        expect(setCurrentPage).toHaveBeenLastCalledWith(1);
        expect(searchForVideos).toHaveBeenCalledTimes(3);
    });
});