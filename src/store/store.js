import { configureStore } from 'redux-starter-kit';
import videoListReducer from './videoList/videoList.reducer';
import { reducer as formReducer } from 'redux-form';

const reducer = {
    videoList: videoListReducer,
    form: formReducer
};

export default configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
});