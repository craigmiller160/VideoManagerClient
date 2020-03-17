import enzymeCreator from 'react-enzyme-utils';
import FileListItem from 'components/UI/FileChooser/FileListItem';
import FileChooserContext from 'components/UI/FileChooser/FileChooserContext';

const selectFile = jest.fn();
const openDirectory = jest.fn();

const defaultProps = {
    file: {
        isDirectory: false,
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

const mounter = enzymeCreator({
    component: FileListItem,
    props: defaultProps,
    context: {
        type: FileChooserContext,
        value: defaultContextValue
    }
});

const testRendering = (component, {
    directory = false,
    selectHidden = false,
    directoriesOnly = false
} = {}) => {
    const fileListItem = component.find('FileListItem');

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
            const { component } = mounter();
            testRendering(component);
        });

        it('renders with select hidden', () => {
            const { component } = mounter({
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
            const { component } = mounter({
                props: {
                    ...defaultProps,
                    file: {
                        ...defaultProps.file,
                        isDirectory: true
                    }
                }
            });
            testRendering(component, {
                directory: true
            });
        });

        it('renders with a directory and is directories only', () => {
            const { component } = mounter({
                props: {
                    ...defaultProps,
                    file: {
                        ...defaultProps.file,
                        isDirectory: true
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
            const { component } = mounter({
                props: {
                    ...defaultProps,
                    file: {
                        ...defaultProps.file,
                        isDirectory: true
                    }
                }
            });
            component.find('Button[data-name="open-btn"]').props().onClick();
            expect(openDirectory).toHaveBeenCalledWith({
                ...defaultProps.file,
                isDirectory: true
            });
        });

        it('selectFile', () => {
            const { component } = mounter();
            component.find('Button[data-name="select-btn"]').props().onClick();
            expect(selectFile).toHaveBeenCalledWith(defaultProps.file);
        });
    });
});
