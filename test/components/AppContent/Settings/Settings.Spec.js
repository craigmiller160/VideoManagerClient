import React from 'react';
import { act } from 'react-dom/test-utils';
import Settings, { FORM_NAME } from 'components/AppContent/Settings';
import enzymeCreator from 'react-enzyme-utils';
import { isRequired } from 'utils/validations';
import Input from 'components/UI/form/Input/Input';
import Spinner from 'components/UI/Spinner/Spinner';
import ToolTip from 'components/UI/ToolTip';

jest.mock('store/settings/settings.actions', () => ({
    loadSettings: () => ({ type: 'settings/loadSettings' }),
    saveSettings: (values) => async (dispatch) => {
        dispatch({ type: 'settings/saveSettings', payload: values });
        return values.result;
    }
}));

jest.mock('components/UI/FileChooser', () => {
    const FileChooser = (props) => <div { ...props } />;
    return FileChooser;
});

const rootDir = 'rootDir';

const defaultStoreState = {
    settings: {
        loading: false
    },
    form: {
        [FORM_NAME]: {
            values: {
                rootDir
            }
        }
    }
};

const defaultProps = {
    rootDirEditing: false,
    rootDirModified: false
};

const mounter = enzymeCreator({
    component: Settings,
    props: defaultProps,
    redux: {
        state: defaultStoreState,
        useThunk: true
    }
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
    expect(component.find(ToolTip).props()).toEqual(expect.objectContaining({
        text: 'rootDir'
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

    expect(component.find('FileChooser').props()).toEqual({
        directoriesOnly: true,
        selectFile: expect.any(Function),
        initialDir: rootDir
    });

    let fileChooserClassName = 'fileChooser';
    if (fileChooser) {
        fileChooserClassName = `${fileChooserClassName} show`;
    }
    expect(component.find('div#file-chooser-container').props().className)
        .toEqual(expect.stringContaining(fileChooserClassName));

    let btnClassName = 'submit';
    if (!fileChooser) {
        btnClassName = `${btnClassName} show`;
    }

    expect(component.find('div#btn-container').props().className)
        .toEqual(expect.stringContaining(btnClassName));
    expect(component.find('Button#save-btn').props().disabled).toEqual(true);
};

describe('Settings', () => {
    describe('rendering', () => {
        it('renders while loading', () => {
            const { component } = mounter({
                reduxState: {
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
            const { component } = mounter();
            testRendering(component);
        });

        it('renders with form and file chooser', () => {
            const { component } = mounter({
                props: {
                    rootDirEditing: true
                }
            });
            testRendering(component, {
                fileChooser: true
            });
        });
    });

    describe('actions', () => {
        const removeReduxForm = (action) => !action.type.includes('@@redux-form');
        it('dispatches loadSettings on mount', () => {
            const { store } = mounter();
            expect(store.getActions().filter(removeReduxForm)).toEqual([
                { type: 'settings/loadSettings' }
            ]);
        });

        it('calls editRootDir', () => {
            const { component } = mounter();
            expect(component.find('div#file-chooser-container').props().className)
                .toEqual(expect.stringContaining('fileChooser'));
            expect(component.find('div#btn-container').props().className)
                .toEqual(expect.stringContaining('submit show'));

            act(() => {
                component.find('Button#set-root-dir-btn').props().onClick();
            });
            component.update();

            expect(component.find('div#file-chooser-container').props().className)
                .toEqual(expect.stringContaining('fileChooser show'));
            expect(component.find('div#btn-container').props().className)
                .toEqual(expect.stringContaining('submit'));
        });

        it('calls selectDir', () => {
            const value = { filePath: 'filePath' };
            const { component, store } = mounter();
            act(() => {
                component.find('FileChooser').props().selectFile(value);
            });
            component.update();
            expect(component.find('Button#save-btn').props().disabled).toEqual(false);
            expect(store.getActions()).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    type: '@@redux-form/CHANGE',
                    payload: value.filePath
                })
            ]))
        });

        describe('submits form', () => {
            it('successful', async () => {
                const { component, store } = mounter({
                    props: {
                        ...defaultProps,
                        rootDirModified: true
                    },
                    reduxState: {
                        ...defaultStoreState,
                        form: {
                            [FORM_NAME]: {
                                values: {
                                    result: true
                                }
                            }
                        }
                    }
                });
                await act(async () => {
                    await component.find('form').simulate('submit');
                });
                component.update();
                expect(store.getActions().filter(removeReduxForm)).toEqual([
                    { type: 'settings/loadSettings' },
                    { type: 'settings/saveSettings', payload:  { result: true } }
                ]);
                expect(component.find('Button#save-btn').props().disabled).toEqual(true);
            });

            it('failed', async () => {
                const { component, store } = mounter({
                    props: {
                        ...defaultProps,
                        rootDirModified: true
                    },
                    reduxState: {
                        ...defaultStoreState,
                        form: {
                            [FORM_NAME]: {
                                values: {
                                    result: false
                                }
                            }
                        }
                    }
                });
                await act(async () => {
                    await component.find('form').simulate('submit');
                });
                component.update();
                expect(store.getActions().filter(removeReduxForm)).toEqual([
                    { type: 'settings/loadSettings' },
                    { type: 'settings/saveSettings', payload: { result: false } }
                ]);
                expect(component.find('Button#save-btn').props().disabled).toEqual(false);
            });
        });
    });
});
