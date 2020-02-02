import PropTypes from 'prop-types';

export const filePropType = PropTypes.shape({
    isDirectory: PropTypes.bool.isRequired,
    fileName: PropTypes.string.isRequired,
    filePath: PropTypes.string.isRequired
}).isRequired;

export const fileListPropType = PropTypes.shape({
    rootPath: PropTypes.string.isRequired,
    parentPath: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(filePropType).isRequired
}).isRequired;
