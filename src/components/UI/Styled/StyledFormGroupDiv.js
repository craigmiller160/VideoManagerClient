import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledFormGroupDiv = styled.div`
    margin-bottom: 10px;
    display: ${(props) => props.hidden ? 'hidden' : 'block'};
    text-align: left;
`;
StyledFormGroupDiv.displayName = 'StyledFormGroupDiv';
StyledFormGroupDiv.propTypes = {
    hidden: PropTypes.bool
};

export default StyledFormGroupDiv;