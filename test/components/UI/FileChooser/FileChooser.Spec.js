import {
    getDirectoriesFromDirectory,
    getFilesFromDirectory
} from 'services/LocalFileApiService';
import mountTestComponent from '../../../exclude/testUtil/mountTestComponent';
import FileChooser from 'components/UI/FileChooser';
import resolveComponent from '../../../exclude/testUtil/resolveComponent';

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
            const { component } = doMount();
            console.log(component.debug()); // TODO delete this
            throw new Error();
        });

        it('renders after loading completed', async () => {
            const { component } = doMount();
            await resolveComponent(component);
            console.log(component.debug()); // TODO delete this
            throw new Error();
        });

        it('loads only directories', async () => {
            const { component } = doMount({
                props: {
                    ...defaultProps,
                    directoriesOnly: true
                }
            });
            await resolveComponent(component);
            console.log(component.debug()); // TODO delete this
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
