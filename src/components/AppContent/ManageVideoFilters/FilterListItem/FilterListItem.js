import React from 'react';
import PropTypes from 'prop-types';
import classes from './FilterListItem.scss';

const FilterListItem = (props) => {
    return (
        <p className={ classes.FilterListItem }>
            { props.label }
        </p>
    );
};
FilterListItem.propTypes = {
    label: PropTypes.string.isRequired
};

export default FilterListItem;