import React from 'react';
import PropTypes from 'prop-types';
import classes from './FilterListItem.scss';

const FilterListItem = (props) => {
    const {
        label,
        click
    } = props;
    return (
        <p
            onClick={ click }
            className={ classes.FilterListItem }
        >
            { label }
        </p>
    );
};
FilterListItem.propTypes = {
    label: PropTypes.string.isRequired,
    click: PropTypes.func
};

export default FilterListItem;