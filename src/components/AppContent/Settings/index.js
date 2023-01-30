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

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import classes from './Settings.module.scss';
import FlexRow from '../../UI/Grid/FlexRow';
import Spinner from '../../UI/Spinner/Spinner';
import {
	loadSettings,
	saveSettings
} from '../../../store/settings/settings.actions';
import Form from '../../UI/form/Form/Form';
import Input from '../../UI/form/Input/Input';
import { Button } from 'reactstrap';
import { isRequired } from '../../../utils/validations';
import FileChooser from '../../UI/FileChooser';
import { change } from 'redux-form';
import ToolTip from '../../UI/ToolTip';

export const FORM_NAME = 'Settings_Form';

const Settings = (props) => {
	const { rootDirEditing, rootDirModified } = props;
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.settings.loading);
	const form = useSelector((state) => state.form[FORM_NAME], shallowEqual);
	const [state, setState] = useState({
		rootDirEditing,
		rootDirModified
	});

	useEffect(() => {
		dispatch(loadSettings());
	}, []);

	const editRootDir = () =>
		setState((prevState) => ({
			...prevState,
			rootDirEditing: true
		}));

	const selectDir = (selected) => {
		setState((prevState) => ({
			...prevState,
			rootDirEditing: false,
			rootDirModified: true
		}));
		dispatch(change(FORM_NAME, 'rootDir', selected.filePath));
	};

	const submit = async (values) => {
		const successful = await dispatch(saveSettings(values));
		if (successful) {
			setState((prevState) => ({
				...prevState,
				rootDirModified: false
			}));
		}
	};

	const showFileChooserClass = state.rootDirEditing ? classes.show : '';
	const showSaveClass = state.rootDirEditing ? '' : classes.show;

	// Separate variable for this to make it easily extensible
	const enableSaveBtn = state.rootDirModified;
	const rootDirToolTipText = form?.values?.rootDir ?? '';

	return (
		<div className={classes.Settings}>
			<FlexRow>
				<div className={classes.title}>
					<h3>Settings</h3>
				</div>
			</FlexRow>
			<Form
				form={FORM_NAME}
				onSubmit={submit}
				destroyOnUnmount={false}
				className={classes.form}
			>
				{loading && <Spinner />}
				{!loading && (
					<div id="settings-form-content">
						<FlexRow
							id="root-dir-container"
							className={classes.rootDirWrapper}
							justifyContent="center"
							alignItems="flex-end"
						>
							<ToolTip text={rootDirToolTipText}>
								<Input
									name="rootDir"
									label="Directory to Scan"
									divClassName={classes.rootDir}
									validate={[isRequired]}
									disabled
								/>
							</ToolTip>
							<Button
								id="set-root-dir-btn"
								color="info"
								onClick={editRootDir}
							>
								Set
							</Button>
						</FlexRow>
						<FlexRow
							id="file-chooser-container"
							justifyContent="center"
							className={[
								classes.fileChooser,
								showFileChooserClass
							].join(' ')}
						>
							<FileChooser
								directoriesOnly
								selectFile={selectDir}
								initialDir={form?.values?.rootDir}
							/>
						</FlexRow>
						<FlexRow
							id="btn-container"
							justifyContent="center"
							className={[classes.submit, showSaveClass].join(
								' '
							)}
						>
							<Button
								id="save-btn"
								type="submit"
								color="primary"
								disabled={!enableSaveBtn}
							>
								Save
							</Button>
						</FlexRow>
					</div>
				)}
			</Form>
		</div>
	);
};
Settings.propTypes = {
	rootDirEditing: PropTypes.bool,
	rootDirModified: PropTypes.bool
};
Settings.defaultProps = {
	rootDirEditing: false,
	rootDirModified: false
};

export default Settings;
