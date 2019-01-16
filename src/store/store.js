import { configureStore } from 'redux-starter-kit';
import videoListReducer from './videoList/videoList.reducer';
import videoSearchReduer from './videoSearch/videoSearch.reducer';
import { reducer as formReducer } from 'redux-form';

const reducer = {
    videoList: videoListReducer,
    videoSearch: videoSearchReduer,
    form: formReducer
};

export default configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
});