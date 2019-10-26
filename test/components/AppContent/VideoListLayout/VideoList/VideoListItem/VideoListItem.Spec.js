import VideoListItem from 'components/AppContent/VideoListLayout/VideoList/VideoListItem/VideoListItem';
import mountTestComponent from '../../../../../exclude/testUtil/mountTestComponent';
import { ROLE_EDIT } from 'utils/securityConstants';

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
    const rootDiv = component.find('div[data-name="video-list-item-root"]');
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
            throw new Error('Finish this');
        });

        it('calls playVideoClick', () => {
            throw new Error('Finish this');
        });
    });

    // it('shows smaller view', () => {
    //     const [component] = doMount();
    //     expect(component.find('Collapse').props()).toEqual(expect.objectContaining({
    //         isOpen: false
    //     }));
    // });
    //
    // it('shows expanded view', () => {
    //     const [component] = doMount({ ...defaultProps, videoFile: { ...defaultProps.videoFile, expanded: true } });
    //     expect(component.find('Collapse').props()).toEqual(expect.objectContaining({
    //         isOpen: true
    //     }));
    // });
    //
    // it('handles clicks', () => {
    //     const [component, store] = doMount();
    //     component.simulate('click');
    //     expect(store.getActions()).toEqual([
    //         { type: 'videoList/expandVideoFile', payload: 1 }
    //     ]);
    // });
    //
    // it('renders without edit role', () => {
    //     throw new Error('Finish this');
    // });
});
