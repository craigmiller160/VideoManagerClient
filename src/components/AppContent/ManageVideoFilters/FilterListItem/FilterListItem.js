import React from 'react';
import PropTypes from 'prop-types';
import classes from './FilterListItem.scss';

const FilterListItem = (props) => {
    const {
        label,
        value,
        click
    } = props;
    return (
        <p
            onClick={ () => click(value) }
            className={ classes.FilterListItem }
        >
            { label }
        </p>
    );
};
FilterListItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    click: PropTypes.func.isRequired
};

export default FilterListItem;