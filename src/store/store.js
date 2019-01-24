import { configureStore } from 'redux-starter-kit';
import videoListReducer from './videoList/videoList.reducer';
import videoSearchReduer from './videoSearch/videoSearch.reducer';
import { reducer as formReducer } from 'redux-form';
import alertReducer from './alert/alert.reducer';

const reducer = {
    videoList: videoListReducer,
    videoSearch: videoSearchReduer,
    form: formReducer,
    alert: alertReducer
};

export default configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
});