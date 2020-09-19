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
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import newid from '../../../../utils/newid';
import createField from "../createField";
import StyledLabel from '../../Styled/StyledLabel';
import StyledFormGroupDiv from '../../Styled/StyledFormGroupDiv';

export const SelectComponent = (props) => {
    const {
        label,
        input,
        options,
        multi,
        inputProps,
        divClassName,
        disabled
    } = props;

    const id = newid();
    return (
        <StyledFormGroupDiv className={ divClassName }>
            <StyledLabel
                htmlFor={ id }
            >
                { label }
            </StyledLabel>
            <ReactSelect
                id={ id }
                { ...input }
                { ...inputProps }
                name={ input && input.name }
                onBlur={ (event) => event.preventDefault() }
                onChange={ input.onChange }
                options={ options }
                isSearchable
                isClearable
                isMulti={ multi }
                isDisabled={ disabled }
            />
        </StyledFormGroupDiv>
    );
};

SelectComponent.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any
    })),
    input: PropTypes.shape({
        name: PropTypes.string,
        onChange: PropTypes.func
    }),
    multi: PropTypes.bool,
    inputProps: PropTypes.object,
    divClassName: PropTypes.string,
    disabled: PropTypes.bool
};

SelectComponent.defaultProps = {
    options: [],
    multi: false,
    inputProps: {},
    disabled: false
};

const Field = createField(SelectComponent);
Field.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    multi: PropTypes.bool,
    divClassName: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any
    }))
};
export default Field;
