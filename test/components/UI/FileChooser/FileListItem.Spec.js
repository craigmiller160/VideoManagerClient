import mountTestComponent from '../../../exclude/testUtil/mountTestComponent';
import FileListItem from 'components/UI/FileChooser/FileListItem';

const defaultProps = {

};

const doMount = mountTestComponent(FileListItem, {
    defaultProps
});

describe('FileListItem', () => {
    describe('rendering', () => {
        it('renders with a file', () => {
            throw new Error();
        });

        it('renders with a directory', () => {
            throw new Error();
        });

        it('renders with a directory and is directories only', () => {
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
    });
});
