import React from 'react';
import mountTestComponent from '../../../exclude/testUtil/mountTestComponent';
import Settings, { FORM_NAME } from 'components/AppContent/Settings';
import { isRequired } from '../../../../src/utils/validations';
import Input from 'components/UI/form/Input/Input';
import Spinner from 'components/UI/Spinner/Spinner';

jest.mock('store/settings/settings.actions', () => ({
    loadSettings: () => ({ type: 'settings/loadSettings' }),
    saveSettings: (values) => ({ type: 'settings/saveSettings', payload: values })
}));

jest.mock('components/UI/FileChooser', () => {
    const FileChooser = (props) => <div { ...props } />;
    return FileChooser;
});

const defaultStoreState = {
    settings: {
        loading: false
    }
};

const defaultProps = {
    rootDirEditing: false
};

const doMount = mountTestComponent(Settings, {
    defaultStoreState
});

const testRendering = (component, { loading = false, fileChooser = false } = {}) => {
    expect(component.find('div.title > h3').text()).toEqual('Settings');
    expect(component.find('ReduxForm').at(0).props()).toEqual(expect.objectContaining({
        form: FORM_NAME,
        onSubmit: expect.any(Function),
        destroyOnUnmount: false,
        className: 'form'
    }));

    if (loading) {
        expect(component.find(Spinner)).toHaveLength(1);
        expect(component.find('div#settings-form-content')).toHaveLength(0);
        return;
    }

    expect(component.find(Spinner)).toHaveLength(0);
    expect(component.find('div#settings-form-content')).toHaveLength(1);

    expect(component.find(Input).props()).toEqual(expect.objectContaining({
        name: 'rootDir',
        label: 'Directory to Scan',
        divClassName: 'rootDir',
        validate: [isRequired],
        disabled: true
    }));
    expect(component.find('Button#set-root-dir-btn').props()).toEqual(expect.objectContaining({
        id: 'set-root-dir-btn',
        color: 'info',
        onClick: expect.any(Function)
    }));
    expect(component.find('Button#set-root-dir-btn').text()).toEqual('Set');

    expect(component.find('Button#save-btn').props()).toEqual(expect.objectContaining({
        id: 'save-btn',
        type: 'submit',
        color: 'primary'
    }));
    expect(component.find('Button#save-btn').text()).toEqual('Save');
};

describe('Settings', () => {
    describe('rendering', () => {
        it('renders while loading', () => {
            const { component } = doMount({
                storeState: {
                    ...defaultStoreState,
                    settings: {
                        ...defaultStoreState.settings,
                        loading: true
                    }
                }
            });
            testRendering(component, {
                loading: true
            });
        });

        it('renders with form, no file chooser', () => {
            const { component } = doMount();
            testRendering(component);
        });

        it('renders with form and file chooser', () => {
            const { component } = doMount();
            testRendering(component, {
                fileChooser: true
            });
            throw new Error('Integrate file chooser tests');
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
