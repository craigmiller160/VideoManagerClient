import React from 'react';
import mountTestComponent from '../../../exclude/testUtil/mountTestComponent';
import Settings from 'components/AppContent/Settings';

jest.mock('components/UI/FileChooser', () => {
    const FileChooser = (props) => <div { ...props } />;
    return FileChooser;
});

const defaultStoreState = {
    settings: {
        loading: false
    }
};

const doMount = mountTestComponent(Settings, {
    defaultStoreState
});

describe('Settings', () => {
    describe('rendering', () => {
        it('renders while loading', () => {
            throw new Error();
        });

        it('renders with form, no file chooser', () => {
            throw new Error();
        });

        it('renders with form and file chooser', () => {
            throw new Error();
        });
    });

    describe('actions', () => {
        it('dispatches loadSettings on mount', () => {
            throw new Error();
        });

        it('calls editRootDir', () => {
            throw new Error();
        });

        it('calls selectDir', () => {
            throw new Error();
        });

        it('submits form', () => {
            throw new Error();
        });
    });
});
