import {
    getDirectoriesFromDirectory,
    getFilesFromDirectory
} from 'services/LocalFileApiService';
import mountTestComponent from '../../../exclude/testUtil/mountTestComponent';
import FileChooser from 'components/UI/FileChooser';

jest.mock('services/LocalFileApiService', () => ({
    getDirectoriesFromDirectory: jest.fn(),
    getFilesFromDirectory: jest.fn()
}));

const selectFile = jest.fn();

const defaultProps = {
    directoriesOnly: false,
    selectFile
};

const defaultStoreState = {};

const doMount = mountTestComponent(FileChooser, {
    defaultProps,
    defaultStoreState
});

describe('FileChooser', () => {
    describe('rendering', () => {
        it('renders while loading', () => {
            throw new Error();
        });

        it('renders after loading completed', () => {
            throw new Error();
        });

        it('loads only directories', () => {
            throw new Error();
        });
    });

    describe('actions', () => {
        it('openDirectory', () => {
            throw new Error();
        });

        it('selectFile', () => {
            throw new Error();
        });

        it('handles loading error', () => {
            throw new Error();
        });
    });
});
