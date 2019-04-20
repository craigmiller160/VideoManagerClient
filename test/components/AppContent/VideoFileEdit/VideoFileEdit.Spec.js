import React from 'react';
import { mount } from 'enzyme';
import { VideoFileEdit } from 'components/AppContent/VideoFileEdit/VideoFileEdit';

const showFileChanges = jest.fn();
const showAddCategoryModal = jest.fn();
const showAddSeriesModal = jest.fn();
const showAddStarModal = jest.fn();
const defaultProps = {
    selectedVideo: {},
    filters: {
        categories: [],
        series: [],
        stars: []
    },
    showFileChanges,
    showAddCategoryModal,
    showAddSeriesModal,
    showAddStarModal
};

const doMount = (props = defaultProps) => mount(
    <VideoFileEdit { ...props } />
);

describe('VideoFileEdit', () => {
    it('renders without selected video', () => {
        const component = doMount({
            ...defaultProps,
            selectedVideo: null
        });
        expect(component.find('div')).toHaveLength(1);
        expect(component.find('Form')).toHaveLength(0);
    });

    it('renders prompt when leaving without submitting', () => {
        throw new Error('Finish this');
    });

    it('renders correctly', () => {
        throw new Error('Finish this');
    });
});