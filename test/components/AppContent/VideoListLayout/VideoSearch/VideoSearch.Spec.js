import React from 'react';
import { mount } from 'enzyme';
import { FORM_NAME, VideoSearch } from 'components/AppContent/VideoListLayout/VideoSearch/VideoSearch';
import mockComponent from '../../../../exclude/testUtil/mockComponent';

jest.mock('redux-form', () => ({
    reduxForm: () => (Comp) => Comp
}));
jest.mock('components/UI/form/Input/Input', () => (props) => mockComponent('Input', props));
jest.mock('components/UI/form/Select/Select', () => (props) => mockComponent('Select', props));

const loadFilterOptions = jest.fn();
const searchForVideos = jest.fn();
const resetForm = jest.fn();
const props = {
    loadFilterOptions,
    searchForVideos,
    resetForm,
    filters: {
        categories: [
            { value: 1, label: 'Cat 1' }
        ],
        series: [
            { value: 1, label: 'Series 1' }
        ],
        stars: [
            { value: 1, label: 'Star 1' }
        ]
    }
};

const createComponent = (props = {}) => mount(
    <VideoSearch { ...props } />
);

describe('VideoSearch', () => {
    beforeEach(() => {
        loadFilterOptions.mockReset();
        searchForVideos.mockReset();
        resetForm.mockReset();
    });

    it('renders properly', () => {
        const component = createComponent(props);
        expect(loadFilterOptions).toHaveBeenCalled();
        expect(component.find('mock-comp[name="category"]').props()).toEqual(expect.objectContaining({
            options: props.filters.categories
        }));
        expect(component.find('mock-comp[name="series"]').props()).toEqual(expect.objectContaining({
            options: props.filters.series
        }));
        expect(component.find('mock-comp[name="star"]').props()).toEqual(expect.objectContaining({
            options: props.filters.stars
        }));
    });

    it('calls actions on click', () => {
        const component = createComponent(props);
        component.find(`Form[form="${FORM_NAME}"]`).simulate('submit');
        expect(searchForVideos).toHaveBeenCalled();
        component.find('button#reset-video-search-btn').simulate('click');
        expect(resetForm).toHaveBeenLastCalledWith(FORM_NAME);
    });
});