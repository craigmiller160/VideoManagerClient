import React from 'react';
import { mount } from 'enzyme';
import { VideoList } from '../VideoList';

jest.mock('../VideoListItem/VideoListItem', () => (props) => <mock-video-list-item { ...props } />);
jest.mock('../../../../UI/Spinner/Spinner', () => (props) => <mock-spinner { ...props } />);
jest.mock('../../../../UI/Pagination/Pagination', () => (props) => <mock-pagination { ...props } />);

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
    it('shows spinner while searching', () => {
        const component = createComponent({ ...props, searching: true });
        expect(searchForVideos).toHaveBeenCalled();
        expect(component.find('mock-spinner')).toHaveLength(1);
        expect(component.find('mock-video-list-item')).toHaveLength(0);
        expect(component.find('mock-pagination')).toHaveLength(0);
        expect(component.find('h3')).toHaveLength(1);
    });

    it('shows no videos if list length is 0', () => {
        const component = createComponent(props);
        expect(searchForVideos).toHaveBeenCalled();
        expect(component.find('mock-spinner')).toHaveLength(0);
        expect(component.find('mock-video-list-item')).toHaveLength(0);
        expect(component.find('mock-pagination')).toHaveLength(0);
        expect(component.find('h3')).toHaveLength(2);
        expect(component.find('h3').at(1).text()).toEqual('No Videos Available');
    });

    it('shows videos and pagination', () => {
        const component = createComponent({ ...props, videoList, ...pagination });
        expect(searchForVideos).toHaveBeenCalled();
        expect(component.find('mock-spinner')).toHaveLength(0);
        expect(component.find('mock-video-list-item')).toHaveLength(2);
        expect(component.find('mock-pagination')).toHaveLength(2);
        expect(component.find('h3')).toHaveLength(1);

        expect(component.find('mock-pagination').at(0).props().totalPages).toEqual(4);
    });

    it('handles onClick from Pagination', () => {
        const component = createComponent({ ...props, videoList, ...pagination });
        expect(searchForVideos).toHaveBeenCalled();
        expect(component.find('mock-spinner')).toHaveLength(0);
        expect(component.find('mock-video-list-item')).toHaveLength(2);
        expect(component.find('mock-pagination')).toHaveLength(2);
        expect(component.find('h3')).toHaveLength(1);

        component.instance().paginationClick('<');
        expect(setCurrentPage).toHaveBeenLastCalledWith(-1);

        component.instance().paginationClick('1');
        expect(setCurrentPage).toHaveBeenLastCalledWith(1);

        component.instance().paginationClick('>');
        expect(setCurrentPage).toHaveBeenLastCalledWith(1);
    });
});