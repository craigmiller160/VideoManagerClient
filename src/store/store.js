/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
