import mountTestComponent from '../../../exclude/testUtil/mountTestComponent';
import resolveComponent from '../../../exclude/testUtil/resolveComponent';
import FileListItem from 'components/UI/FileChooser/FileListItem';
import FileChooserContext from 'components/UI/FileChooser/FileChooserContext';

const selectFile = jest.fn();
const openDirectory = jest.fn();

const defaultProps = {
    file: {
        directory: false,
        fileName: 'file',
        filePath: 'path/file'
    },
    hideSelect: false
};

const defaultContextValue = {
    directoriesOnly: false,
    selectFile,
    openDirectory
};

const doMount = mountTestComponent(FileListItem, {
    defaultProps,
    ContextType: FileChooserContext,
    defaultContextValue
});

const testRendering = (component, {
    directory = false,
    selectHidden = false,
    directoriesOnly = false
} = {}) => {
    const fileListItem = component.find('FileListItem');
    console.log(fileListItem.debug()); // TODO delete this

    expect(fileListItem.find('img')).toHaveLength(1);
    expect(fileListItem.find('img').props()).toEqual({
        src: directory ? 'directory.png' : 'file.png',
        alt: directory ? 'Directory Icon' : 'File Icon'
    });

    expect(fileListItem.find('p')).toHaveLength(1);
    expect(fileListItem.find('p').text()).toEqual(defaultProps.file.fileName);

    if (directory) {
        expect(fileListItem.find('Button[data-name="open-btn"]')).toHaveLength(1);
        expect(fileListItem.find('Button[data-name="open-btn"]').props()).toEqual(expect.objectContaining({
            'data-name': 'open-btn',
            color: 'info',
            onClick: expect.any(Function)
        }));
        expect(fileListItem.find('Button[data-name="open-btn"]').text()).toEqual('Open');
    }

    if ((directory && directoriesOnly) || (!directory && !selectHidden)) {
        expect(fileListItem.find('Button[data-name="select-btn"]')).toHaveLength(1);
        expect(fileListItem.find('Button[data-name="select-btn"]').props()).toEqual(expect.objectContaining({
            'data-name': 'select-btn',
            color: 'primary',
            onClick: expect.any(Function)
        }));
        expect(fileListItem.find('Button[data-name="select-btn"]').text()).toEqual('Select');
    }
};

describe('FileListItem', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('rendering', () => {
        it('renders with a file', () => {
            const { component } = doMount();
            testRendering(component);
        });

        it('renders with select hidden', () => {
            const { component } = doMount({
                props: {
                    ...defaultProps,
                    hideSelect: true
                }
            });
            testRendering(component, {
                selectHidden: true
            });
        });

        it('renders with a directory', () => {
            const { component } = doMount({
                props: {
                    ...defaultProps,
                    file: {
                        ...defaultProps.file,
                        directory: true
                    }
                }
            });
            testRendering(component, {
                directory: true
            });
        });

        it('renders with a directory and is directories only', () => {
            const { component } = doMount({
                props: {
                    ...defaultProps,
                    file: {
                        ...defaultProps.file,
                        directory: true
                    }
                },
                contextValue: {
                    ...defaultContextValue,
                    directoriesOnly: true
                }
            });
            testRendering(component, {
                directory: true,
                directoriesOnly: true
            });
        });
    });

    describe('actions', () => {
        it('openDirectory', () => {
            throw new Error();
        });

        it('selectFile', () => {
            throw new Error();
        });
    });
});
