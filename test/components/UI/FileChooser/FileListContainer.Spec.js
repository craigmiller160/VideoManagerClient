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

import mountTestComponent from '../../../exclude/testUtil/mountTestComponent';
import FileListContainer from 'components/UI/FileChooser/FileListContainer';

const files = [...new Array(5).keys()]
    .map(() => ({
        directory: false,
        fileName: 'file',
        filePath: 'path/file'
    }));

const fileList = {
    rootPath: '/parent/root',
    parentPath: '',
    files
};

const defaultProps = {
    fileList
};

const doMount = mountTestComponent(FileListContainer, {
    defaultProps
});

const testRendering = (component, { hasParentPath = false } = {}) => {
    expect(component.find('[data-name="file-list-title"]').text())
        .toEqual(`Path: ${fileList.rootPath}`);

    const itemCount = hasParentPath ? 6 : 5;
    expect(component.find('FileListItem')).toHaveLength(itemCount);
};

describe('FileListContainer', () => {
    describe('rendering', () => {
        it('renders files', () => {
            const { component } = doMount();
            testRendering(component);
        });

        it('renders files with parent path', () => {
            const { component } = doMount({
                props: {
                    ...defaultProps,
                    fileList: {
                        ...defaultProps.fileList,
                        parentPath: '/parent'
                    }
                }
            });
            testRendering(component, { hasParentPath: true });
        });
    });
});
