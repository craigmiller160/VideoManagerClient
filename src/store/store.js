import { configureStore } from 'redux-starter-kit';
import videoListReducer from './videoList/videoList.reducer';
import videoSearchReducer from './videoSearch/videoSearch.reducer';
import scanningReducer from './scanning/scanning.reducer';
import filterInputModalReducer from './filterInputModal/filterInputModal.reducer';
import { reducer as formReducer } from 'redux-form';
import alertReducer from './alert/alert.reducer';

const reducer = {
    videoList: videoListReducer,
    videoSearch: videoSearchReducer,
    form: formReducer,
    alert: alertReducer,
    scanning: scanningReducer,
    filterInputModal: filterInputModalReducer
};

export default configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
});