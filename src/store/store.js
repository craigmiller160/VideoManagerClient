import { configureStore } from 'redux-starter-kit';
import videoListReducer from 'videoList/videoList.reducer';

const reducer = {
    videoList: videoListReducer
};

export default configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
});