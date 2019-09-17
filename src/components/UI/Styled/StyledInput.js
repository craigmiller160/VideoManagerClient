import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled.input`
    border: 1px solid ${(props) => props.hasError ? '#dc3545' : 'lightgray'};
    border-radius: 3px;
    display: block;
    width: 100%;
    font-size: 1rem;
    padding: 2px 8px;
    line-height: 1.5;
    font-weight: 400;
    height: calc(2.25rem + 2px);
`;
StyledInput.displayName = 'StyledInput';
StyledInput.propTypes = {
    hasError: PropTypes.bool
};
StyledInput.defaultProps = {
    hasError: false
};

export default StyledInput;