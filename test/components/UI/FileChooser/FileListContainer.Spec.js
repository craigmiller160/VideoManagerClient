import enzymeCreator from 'react-enzyme-utils';
import FileListContainer from 'components/UI/FileChooser/FileListContainer';

const files = [...new Array(5).keys()]
    .map(() => ({
        directory: false,
        fileName: 'file',
        filePath: 'path/file'
    }));

const fileList = {
    rootPath: '/parent/root',
    parentPath: '',
    files
};

const defaultProps = {
    fileList
};

const mounter = enzymeCreator({
    component: FileListContainer,
    props: defaultProps
});

const testRendering = (component, { hasParentPath = false } = {}) => {
    expect(component.find('[data-name="file-list-title"]').text())
        .toEqual(`Path: ${fileList.rootPath}`);

    const itemCount = hasParentPath ? 6 : 5;
    expect(component.find('FileListItem')).toHaveLength(itemCount);
};

describe('FileListContainer', () => {
    describe('rendering', () => {
        it('renders files', () => {
            const { component } = mounter();
            testRendering(component);
        });

        it('renders files with parent path', () => {
            const { component } = mounter({
                props: {
                    ...defaultProps,
                    fileList: {
                        ...defaultProps.fileList,
                        parentPath: '/parent'
                    }
                }
            });
            testRendering(component, { hasParentPath: true });
        });
    });
});
