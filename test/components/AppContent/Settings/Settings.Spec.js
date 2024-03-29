/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import { act } from 'react-dom/test-utils';
import mountTestComponent from '../../../exclude/testUtil/mountTestComponent';
import Settings, { FORM_NAME } from 'components/AppContent/Settings';
import { isRequired } from '../../../../src/utils/validations';
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
	const FileChooser = (props) => <div {...props} />;
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

const doMount = mountTestComponent(Settings, {
	defaultStoreState,
	defaultProps,
	defaultUseThunk: true
});

const testRendering = (
	component,
	{ loading = false, fileChooser = false } = {}
) => {
	expect(component.find('div.title > h3').text()).toEqual('Settings');
	expect(component.find('ReduxForm').at(0).props()).toEqual(
		expect.objectContaining({
			form: FORM_NAME,
			onSubmit: expect.any(Function),
			destroyOnUnmount: false,
			className: 'form'
		})
	);

	if (loading) {
		expect(component.find(Spinner)).toHaveLength(1);
		expect(component.find('div#settings-form-content')).toHaveLength(0);
		return;
	}

	expect(component.find(Spinner)).toHaveLength(0);
	expect(component.find('div#settings-form-content')).toHaveLength(1);

	expect(component.find(Input).props()).toEqual(
		expect.objectContaining({
			name: 'rootDir',
			label: 'Directory to Scan',
			divClassName: 'rootDir',
			validate: [isRequired],
			disabled: true
		})
	);
	expect(component.find(ToolTip).props()).toEqual(
		expect.objectContaining({
			text: 'rootDir'
		})
	);
	expect(component.find('Button#set-root-dir-btn').props()).toEqual(
		expect.objectContaining({
			id: 'set-root-dir-btn',
			color: 'info',
			onClick: expect.any(Function)
		})
	);
	expect(component.find('Button#set-root-dir-btn').text()).toEqual('Set');

	expect(component.find('Button#save-btn').props()).toEqual(
		expect.objectContaining({
			id: 'save-btn',
			type: 'submit',
			color: 'primary'
		})
	);
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
	expect(
		component.find('div#file-chooser-container').props().className
	).toEqual(expect.stringContaining(fileChooserClassName));

	let btnClassName = 'submit';
	if (!fileChooser) {
		btnClassName = `${btnClassName} show`;
	}

	expect(component.find('div#btn-container').props().className).toEqual(
		expect.stringContaining(btnClassName)
	);
	expect(component.find('Button#save-btn').props().disabled).toEqual(true);
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
			const { component } = doMount({
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
		const removeReduxForm = (action) =>
			!action.type.includes('@@redux-form');
		it('dispatches loadSettings on mount', () => {
			const { store } = doMount();
			expect(store.getActions().filter(removeReduxForm)).toEqual([
				{ type: 'settings/loadSettings' }
			]);
		});

		it('calls editRootDir', () => {
			const { component } = doMount();
			expect(
				component.find('div#file-chooser-container').props().className
			).toEqual(expect.stringContaining('fileChooser'));
			expect(
				component.find('div#btn-container').props().className
			).toEqual(expect.stringContaining('submit show'));

			act(() => {
				component.find('Button#set-root-dir-btn').props().onClick();
			});
			component.update();

			expect(
				component.find('div#file-chooser-container').props().className
			).toEqual(expect.stringContaining('fileChooser show'));
			expect(
				component.find('div#btn-container').props().className
			).toEqual(expect.stringContaining('submit'));
		});

		it('calls selectDir', () => {
			const value = { filePath: 'filePath' };
			const { component, store } = doMount();
			act(() => {
				component.find('FileChooser').props().selectFile(value);
			});
			component.update();
			expect(component.find('Button#save-btn').props().disabled).toEqual(
				false
			);
			expect(store.getActions()).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: '@@redux-form/CHANGE',
						payload: value.filePath
					})
				])
			);
		});

		describe('submits form', () => {
			it('successful', async () => {
				const { component, store } = doMount({
					props: {
						...defaultProps,
						rootDirModified: true
					},
					storeState: {
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
					{ type: 'settings/saveSettings', payload: { result: true } }
				]);
				expect(
					component.find('Button#save-btn').props().disabled
				).toEqual(true);
			});

			it('failed', async () => {
				const { component, store } = doMount({
					props: {
						...defaultProps,
						rootDirModified: true
					},
					storeState: {
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
					{
						type: 'settings/saveSettings',
						payload: { result: false }
					}
				]);
				expect(
					component.find('Button#save-btn').props().disabled
				).toEqual(false);
			});
		});
	});
});
