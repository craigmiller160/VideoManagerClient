import { configureStore } from 'redux-starter-kit';
import videoListReducer from './videoList/videoList.reducer';
import videoSearchReducer from './videoSearch/videoSearch.reducer';
import scanningReducer from './scanning/scanning.reducer';
import filterInputModalReducer from './filterInputModal/filterInputModal.reducer';
import videoPlayerReducer from './videoPlayer/videoPlayer.reducer';
import { reducer as formReducer } from 'redux-form';
import alertReducer from './alert/alert.reducer';
import authReducer from './auth/auth.reducer';
import settingsReducer from './settings/settings.reducer';

const reducer = {
    videoList: videoListReducer,
    videoSearch: videoSearchReducer,
    form: formReducer,
    alert: alertReducer,
    scanning: scanningReducer,
    filterInputModal: filterInputModalReducer,
    videoPlayer: videoPlayerReducer,
    auth: authReducer,
    settings: settingsReducer
};

export default configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
});
