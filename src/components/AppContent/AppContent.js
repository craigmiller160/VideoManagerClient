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
import VideoNavbar from 'components/AppContent/VideoNavbar/VideoNavbar';
import { Col, Container, Row } from 'reactstrap';
import Alert from '../UI/Alert/Alert';
import { checkIsScanning } from 'store/scanning/scanning.actions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import { getSelectedVideoWithFilters } from 'store/videoList/videoList.selectors';
import classes from './AppContent.module.scss';
import { loadFilterOptions } from 'store/videoSearch/videoSearch.actions';
import {
	saveVideoFileEdits,
	deleteVideoFile
} from 'store/videoList/videoList.actions';
import AppRoutes from './AppRoutes';
import { checkAuth } from '../../store/auth/auth.actions';
import { hideAlert } from '../../store/alert/alert.actions';

const AppContent = () => {
	const [isStarted, setStarted] = useState(false);
	const { history } = useReactRouter();
	const dispatch = useDispatch();
	const isScanning = useSelector(
		(state) => state.scanning.isScanning,
		shallowEqual
	);
	const alert = useSelector((state) => state.alert, shallowEqual);
	const selectedVideo = useSelector(
		getSelectedVideoWithFilters,
		shallowEqual
	);
	const isAuth = useSelector((state) => state.auth.isAuth, shallowEqual);

	useEffect(() => {
		const doCheckAuth = async () => {
			await dispatch(checkAuth());
			setStarted(true);
		};
		doCheckAuth();
	}, []);

	useEffect(() => {
		const startup = async () => {
			if (isAuth) {
				dispatch(loadFilterOptions());
				await dispatch(checkIsScanning());
			}
		};
		startup();
	}, [isAuth]);

	const saveFileChanges = async () => {
		await dispatch(saveVideoFileEdits());
		history.push('/videos');
	};

	const deleteFile = async (fileId) => {
		if (confirm('Are you sure you want to delete this file?')) {
			await dispatch(deleteVideoFile(fileId));
			history.push('/videos');
		}
	};

	const hideAlertOnClick = () => dispatch(hideAlert());

	return (
		<div className={classes.AppContent} onClick={hideAlertOnClick}>
			<VideoNavbar disabled={isScanning || !isStarted} />
			{isStarted && (
				<Container className={classes.container}>
					<Row>
						<Col xs={{ size: 8, offset: 2 }}>
							<Alert alert={alert} />
						</Col>
					</Row>
					<AppRoutes
						deleteFile={deleteFile}
						saveFileChanges={saveFileChanges}
						selectedVideo={selectedVideo}
						isScanning={isScanning}
						isAuth={isAuth}
					/>
				</Container>
			)}
		</div>
	);
};

export default AppContent;
