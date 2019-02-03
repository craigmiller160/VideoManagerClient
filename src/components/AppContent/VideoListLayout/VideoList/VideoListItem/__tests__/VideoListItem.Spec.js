import React from 'react';
import { mount } from 'enzyme';
import VideoListItem from '../VideoListItem';

const expandVideoFile = jest.fn();
const props = {
    videoFile: {
        fileId: 1,
        expanded: false,
        series: [],
        categories: [],
        stars: []
    },
    expandVideoFile
};

const createComponent = (props = {}) => mount(
    <VideoListItem { ...props } />
);

describe('VideoListItem', () => {
    it('shows smaller view', () => {
        const component = createComponent(props);
        expect(component.find('Collapse').props()).toEqual(expect.objectContaining({
            isOpen: false
        }));
    });

    it('shows expanded view', () => {
        const component = createComponent({ ...props, videoFile: { ...props.videoFile, expanded: true } });
        expect(component.find('Collapse').props()).toEqual(expect.objectContaining({
            isOpen: true
        }));
    });

    it('handles clicks', () => {
        const component = createComponent(props);
        component.simulate('click');
        expect(expandVideoFile).toHaveBeenLastCalledWith(1);
    });
});