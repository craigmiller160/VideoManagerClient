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

import VideoListItem from 'components/AppContent/VideoListLayout/VideoList/VideoListItem/VideoListItem';
import mountTestComponent from '../../../../../exclude/testUtil/mountTestComponent';
import { ROLE_EDIT } from 'utils/securityConstants';

jest.mock('store/videoList/videoList.actions', () => ({
    expandVideoFile: () => ({
        type: 'EXPAND_VIDEO_FILE'
    })
}));
jest.mock('store/videoPlayer/videoPlayer.actions', () => ({
    reset: () => ({
        type: 'RESET'
    })
}));

const open = jest.fn();
// Object.defineProperty(window, 'open', open);
window.open = open;

const defaultProps = {
    videoFile: {
        fileId: 1,
        expanded: false,
        series: [
            { seriesId: 1, seriesName: 'seriesName' }
        ],
        categories: [
            { categoryId: 1, categoryName: 'categoryName' }
        ],
        stars: [
            { starId: 1, starName: 'starName' }
        ],
        fileName: 'fileName',
        displayName: 'displayName',
        description: 'description',
        viewCount: 5,
        lastViewed: '2019-01-01T01:01:01',
        fileAdded: '2019-02-02T02:02:02'
    }
};

const defaultStoreState = {
    auth: {
        userDetails: {
            roles: [
                { roleId: 1, name: ROLE_EDIT }
            ]
        }
    }
};

const doMount = mountTestComponent(VideoListItem, {
    defaultProps,
    defaultStoreState,
    defaultInitialRouterEntries: ['/']
});

const testRendering = (component, { isExpanded = false, hasDisplayName = true, hasEditRole = true } = {}) => {
    const rootDiv = component.find(`div[data-name="video-list-item-${defaultProps.videoFile.fileId}"]`);
    const heading = component.find('ListGroupItemHeading');
    const collapse = component.find('Collapse');
    const findLabelSpan = (dataName, value) =>
        expect(component.find(`span[data-name="${dataName}"]`).text()).toEqual(value);
    const findTextItem = (dataName, value) =>
        expect(component.find(`ListGroupItemText[data-name="${dataName}"]`).text()).toEqual(value);
    const findP = (dataName, value) =>
        expect(component.find(`Collapse p[data-name="${dataName}"]`).text()).toEqual(value);

    expect(rootDiv).toHaveLength(1);
    expect(rootDiv.props()).toEqual(expect.objectContaining({
        className: isExpanded ? 'VideoListItem active' : 'VideoListItem',
        onClick: expect.any(Function)
    }));

    expect(heading).toHaveLength(1);
    if (hasDisplayName) {
        expect(heading.text()).toEqual(defaultProps.videoFile.displayName);
    } else {
        expect(heading.text()).toEqual(defaultProps.videoFile.fileName);
    }

    expect(component.find('span.label')).toHaveLength(3);
    findLabelSpan('series-label', 'Series:');
    findLabelSpan('categories-label', 'Categories:');
    findLabelSpan('stars-label', 'Stars:');

    expect(component.find('ListGroupItemText')).toHaveLength(4);
    findTextItem('description-text', defaultProps.videoFile.description);
    findTextItem('series-text', defaultProps.videoFile.series[0].seriesName);
    findTextItem('categories-text', defaultProps.videoFile.categories[0].categoryName);
    findTextItem('stars-text', defaultProps.videoFile.stars[0].starName);

    expect(collapse).toHaveLength(1);
    expect(collapse.props()).toEqual(expect.objectContaining({
        isOpen: isExpanded
    }));

    if (isExpanded) {
         expect(component.find('Collapse p')).toHaveLength(8);
         findP('file-name-label', 'File Name:');
         findP('file-name-text', defaultProps.videoFile.fileName);
         findP('views-label', 'Views:');
         findP('views-text', `${defaultProps.videoFile.viewCount}`);
         findP('last-viewed-label', 'Last Viewed:');
         findP('last-viewed-text', '2019-01-01 01:01 am');
         findP('file-added-label', 'File Added:');
         findP('file-added-text', '2019-02-02 02:02 am');

         expect(component.find('Button')).toHaveLength(hasEditRole ? 2 : 1);
         expect(component.find('Button[data-name="play-btn"]').text()).toEqual('Play');
         if (hasEditRole) {
             expect(component.find('Button[data-name="edit-btn"]').text()).toEqual('Edit');
         }
    }
};

describe('VideoListItem', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('renders without expanding', () => {
            const { component } = doMount();
            testRendering(component);
        });

        it('renders with expanding', () => {
            const { component } = doMount({
                props: {
                    ...defaultProps,
                    videoFile: {
                        ...defaultProps.videoFile,
                        expanded: true
                    }
                }
            });
            testRendering(component, { isExpanded: true });
        });

        it('renders without edit role', () => {
            const { component } = doMount({
                storeState: {
                    ...defaultStoreState,
                    auth: {
                        ...defaultStoreState.auth,
                        userDetails: {
                            roles: []
                        }
                    }
                }
            });
            testRendering(component, { hasEditRole: false });
        });

        it('renders without display name', () => {
            const { component } = doMount({
                props: {
                    ...defaultProps,
                    videoFile: {
                        ...defaultProps.videoFile,
                        displayName: undefined
                    }
                }
            });
            testRendering(component, { hasDisplayName: false });
        });
    });

    describe('Callbacks and actions', () => {
        it('dispatches expandVideoFile', () => {
            const { component, store } = doMount();
            component.find(`div[data-name="video-list-item-${defaultProps.videoFile.fileId}"]`).props().onClick();
            expect(store.getActions()).toEqual([
                { type: 'EXPAND_VIDEO_FILE' }
            ]);
        });

        it('calls playVideoClick', async () => {
            const { component, store } = doMount({
                props: {
                    ...defaultProps,
                    videoFile: {
                        ...defaultProps.videoFile,
                        expanded: true
                    }
                }
            });
            await component.find('Button[data-name="play-btn"]').props().onClick();
            expect(store.getActions()).toEqual([
                { type: 'RESET' }
            ]);
            expect(open).toHaveBeenCalledWith(`/video-manager/play/${defaultProps.videoFile.fileId}`, '_blank');
        });
    });
});
