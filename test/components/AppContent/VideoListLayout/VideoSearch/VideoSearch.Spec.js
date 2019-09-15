import React from 'react';
import { mount } from 'enzyme';
import VideoSearch, { FORM_NAME } from 'components/AppContent/VideoListLayout/VideoSearch/VideoSearch';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

jest.mock('components/UI/form/Input/Input', () => {
    const Input = (props) => <div>{ props.children }</div>;
    return Input;
});
jest.mock('components/UI/form/Select/Select', () => {
    const Select = (props) => <div>{ props.children }</div>;
    return Select;
});
jest.mock('components/UI/form/Form/Form', () => {
    const Form = (props) => <div>{ props.children }</div>;
    return Form;
});

jest.mock('store/videoList/videoList.actions', () => ({
    searchForVideos: () => ({ type: 'SearchForVideos' }),
    setCurrentPage: (page) => ({ type: 'SetCurrentPage', payload: page })
}));

const mockStore = configureMockStore([thunk]);

const defaultState = {
    videoSearch: {
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
    }
};

const doMount = (state = defaultState) => {
    const store = mockStore(state);
    const component = mount(
        <Provider store={ store }>
            <VideoSearch />
        </Provider>
    );
    return [component, store];
};

describe('VideoSearch', () => {
    it('renders properly', () => {
        const [component] = doMount();
        expect(component.find('Select[name="category"]').props()).toEqual(expect.objectContaining({
            options: defaultState.videoSearch.filters.categories
        }));
        expect(component.find('Select[name="series"]').props()).toEqual(expect.objectContaining({
            options: defaultState.videoSearch.filters.series
        }));
        expect(component.find('Select[name="star"]').props()).toEqual(expect.objectContaining({
            options: defaultState.videoSearch.filters.stars
        }));
    });

    it('calls actions on click', () => {
        const [component, store] = doMount();

        const actions1 = [
            { type: 'SetCurrentPage', payload: 0 },
            { type: 'SearchForVideos' }
        ];

        component.find(`Form[form="${FORM_NAME}"]`).props().onSubmit();
        expect(store.getActions()).toEqual(actions1);

        const actions2 = [
            ...actions1,
            { type: '@@redux-form/RESET', meta: { form: 'video-search' } },
            { type: 'SearchForVideos' }
        ];

        component.find('button#reset-video-search-btn').simulate('click');
        expect(store.getActions()).toEqual(actions2);
    });
});