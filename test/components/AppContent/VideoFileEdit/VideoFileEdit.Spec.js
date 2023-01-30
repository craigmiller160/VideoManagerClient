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
import { mount } from 'enzyme';
import { VideoFileEdit } from 'components/AppContent/VideoFileEdit/VideoFileEdit';

const showFileChanges = jest.fn();
const showAddCategoryModal = jest.fn();
const showAddSeriesModal = jest.fn();
const showAddStarModal = jest.fn();
const defaultProps = {
	selectedVideo: {},
	filters: {
		categories: [],
		series: [],
		stars: []
	},
	showFileChanges,
	showAddCategoryModal,
	showAddSeriesModal,
	showAddStarModal
};

const doMount = (props = defaultProps) => mount(<VideoFileEdit {...props} />);

describe('VideoFileEdit', () => {
	it('renders without selected video', () => {
		const component = doMount({
			...defaultProps,
			selectedVideo: null
		});
		expect(component.find('div')).toHaveLength(1);
		expect(component.find('Form')).toHaveLength(0);
	});

	// it('renders prompt when leaving without submitting', () => {
	//     throw new Error('Finish this');
	// });
	//
	// it('renders correctly', () => {
	//     throw new Error('Finish this');
	// });
});
