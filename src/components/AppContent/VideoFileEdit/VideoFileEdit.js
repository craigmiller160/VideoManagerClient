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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from '../../../components/UI/form/Form/Form';
import classes from './VideoFileEdit.module.scss';
import { Button, Col, Row } from 'reactstrap';
import Input from '../../../components/UI/form/Input/Input';
import Select from '../../../components/UI/form/Select/Select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddButton from '../../UI/AddButton/AddButton';
import {
	showAddCategoryModal,
	showAddSeriesModal,
	showAddStarModal
} from '../../../store/filterInputModal/filterInputModal.actions';
import FilterInputModal from '../../Modals/FilterInputModal/FilterInputModal';

export const FORM_NAME = 'video-file-edit';

export const VideoFileEdit = (props) => {
	const [, setSubmitted] = useState(false);

	if (!props.selectedVideo) {
		return <div />;
	}

	const {
		selectedVideo,
		selectedVideo: { fileName },
		filters: { categories, stars, series },
		saveFileChanges,
		showAddCategoryModal,
		showAddSeriesModal,
		showAddStarModal,
		deleteFile
	} = props;

	const submit = () => {
		setSubmitted(true);
		saveFileChanges();
	};

	return (
		<>
			{/*<Prompt*/}
			{/*    when={ !isSubmitted }*/}
			{/*    message="Are you sure you don't want to save your changes?"*/}
			{/*/>*/}
			<Form
				form={FORM_NAME}
				onSubmit={(event) => event.preventDefault()}
				className={classes.VideoFileEdit}
				initialValues={selectedVideo}
			>
				<>
					<Row>
						<Col className="text-center">
							<div className={classes.title}>
								<h3>{fileName}</h3>
							</div>
						</Col>
					</Row>
					<Row className="mt-3 mb-3">
						<Col md={{ size: 4, offset: 4 }}>
							<Input label="Display Name" name="displayName" />
						</Col>
					</Row>
					<Row className="align-items-center justify-content-center text-center mb-3">
						<Col md="4">
							<Select
								label="Categories"
								options={categories}
								name="categories"
								multi
							/>
							<AddButton addItem={showAddCategoryModal} />
						</Col>
						<Col md="4">
							<Select
								label="Series"
								options={series}
								name="series"
								multi
							/>
							<AddButton addItem={showAddSeriesModal} />
						</Col>
						<Col md="4">
							<Select
								label="Stars"
								options={stars}
								name="stars"
								multi
							/>
							<AddButton addItem={showAddStarModal} />
						</Col>
					</Row>
					<Row>
						<Col md={{ size: 6, offset: 3 }}>
							<Input
								type="textarea"
								name="description"
								label="Description"
								textarea={{
									rows: 5
								}}
							/>
						</Col>
					</Row>
					<Row>
						<Col className="text-center">
							<Button
								color="success"
								type="button"
								onClick={submit}
							>
								Save
							</Button>
						</Col>
						<Col className="text-center">
							<Button
								onClick={() => deleteFile(selectedVideo.fileId)}
								color="danger"
								type="button"
							>
								Delete
							</Button>
						</Col>
					</Row>
				</>
			</Form>
			<FilterInputModal />
		</>
	);
};

VideoFileEdit.propTypes = {
	selectedVideo: PropTypes.object.isRequired,
	filters: PropTypes.shape({
		categories: PropTypes.array,
		series: PropTypes.array,
		stars: PropTypes.array
	}).isRequired,
	saveFileChanges: PropTypes.func.isRequired,
	showAddCategoryModal: PropTypes.func,
	showAddSeriesModal: PropTypes.func,
	showAddStarModal: PropTypes.func,
	deleteFile: PropTypes.func
};

const mapStateToProps = (state) => ({
	filters: state.videoSearch.filters
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			showAddCategoryModal: () => showAddCategoryModal(),
			showAddSeriesModal: () => showAddSeriesModal(),
			showAddStarModal: () => showAddStarModal()
		},
		dispatch
	);

const VideoFileEditConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoFileEdit);
VideoFileEditConnected.propTypes = {
	selectedVideo: PropTypes.object.isRequired,
	saveFileChanges: PropTypes.func.isRequired,
	deleteFile: PropTypes.func.isRequired
};

export default VideoFileEditConnected;
