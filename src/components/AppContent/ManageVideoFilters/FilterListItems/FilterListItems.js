import React from 'react';
import PropTypes from 'prop-types';
import FilterListItem from './FilterListItem/FilterListItem';

const FilterListItems = (props) => (
    <>
        {
            props.items.map(({ value, label }, index) => (
                <FilterListItem
                    id={ `${props.type}-filter-item-${index}` }
                    key={ value }
                    label={ label }
                    value={ value }
                    click={ () => props.showEditModal(index) }
                />
            ))
        }
    </>
);

FilterListItems.propTypes = {
    type: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.string
    })),
    showEditModal: PropTypes.func
};

export default FilterListItems;