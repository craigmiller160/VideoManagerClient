import styled from 'styled-components';
import PropTypes from 'prop-types';

const FlexCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${(props) => props.justifyContent};
    align-items: ${(props) => props.alignItems};
`;
FlexCol.displayName = 'FlexCol';
FlexCol.propTypes = {
    justifyContent: PropTypes.string,
    alignItems: PropTypes.string
};

export default FlexCol;