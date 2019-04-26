import React from 'react';
import { mount } from 'enzyme';
import VideoListLayout from 'components/AppContent/VideoListLayout/VideoListLayout';

jest.mock('components/AppContent/VideoListLayout/VideoList/VideoList', () => {
    const VideoList = () => <div />;
    return VideoList;
});
jest.mock('components/AppContent/VideoListLayout/VideoSearch/VideoSearch', () => {
    const VideoSearch = () => <div />;
    return VideoSearch;
});

describe('VideoListLayout', () => {
    it('renders correctly', () => {
        const component = mount(<VideoListLayout/>);
        expect(component.find('VideoSearch')).toHaveLength(1);
        expect(component.find('VideoList')).toHaveLength(1);
    });
});