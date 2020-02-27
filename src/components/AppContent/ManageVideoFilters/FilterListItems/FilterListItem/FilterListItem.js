import React from 'react';
import PropTypes from 'prop-types';
import classes from './FilterListItem.scss';

const FilterListItem = (props) => {
    const {
        id,
        label,
        click
    } = props;
    return (
        <p
            id={ id }
            onClick={ click }
            className={ classes.FilterListItem }
        >
            { label }
        </p>
    );
};
FilterListItem.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    click: PropTypes.func
};

export default FilterListItem;