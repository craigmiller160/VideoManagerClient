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

import VideoPlayer from 'components/AppContent/VideoPlayer/VideoPlayer';
import mountTestComponent from '../../../exclude/testUtil/mountTestComponent';

const defaultProps = {
    fileId: 1,
    videoToken: 'token'
};

const doMount = mountTestComponent(VideoPlayer, {
    defaultProps
});

describe('VideoPlayer', () => {
    describe('rendering', () => {
        it('renders correctly', () => {
            const { component } = doMount();
            expect(component.find('video')).toHaveLength(1);
            expect(component.find('source')).toHaveLength(1);
            expect(component.find('source').props()).toEqual({
                src: '/video-manager/api/video-files/play/1?videoToken=token'
            });
        });
    });
});
