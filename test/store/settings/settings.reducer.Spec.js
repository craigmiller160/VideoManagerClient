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

import settingsReducer, { initialState as settingsInitState } from 'store/settings/settings.reducer';
import { setLoading } from 'store/settings/settings.actions';

describe('settings.reducer', () => {
    it('should return initial state', () => {
        expect(settingsReducer(undefined, {})).toEqual(settingsInitState);
    });

    it('should handle setLoading', () => {
        const action = {
            type: setLoading.toString(),
            payload: true
        };
        expect(settingsReducer(settingsInitState, action)).toEqual({
            ...settingsInitState,
            loading: true
        });
    });
});
