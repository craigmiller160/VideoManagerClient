import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTextArea = styled.textarea`
    display: block;
    border: 1px solid lightgray;
    border-radius: 3px;
    width: 100%;
    resize: ${(props) => props.resize ? 'both' : 'none'};
`;
StyledTextArea.displayName = 'StyledTextArea';
StyledTextArea.propTypes = {
    resize: PropTypes.bool
};
StyledTextArea.defaultProps = {
    resize: false
};

export default StyledTextArea;